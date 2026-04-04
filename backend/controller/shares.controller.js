const shareModel = require("../models/shares.model");
const postModal = require("../models/posts.modal");
const yup = require("yup");
const { Types } = require("mongoose");
const { eventEmitter } = require("../utils/socketServer");

const SHARE_POST_VALIDATION_SCHEMA = yup.object({
  postId: yup
    .string()
    .required("Post ID is required")
    .test("is-valid-objectid", "Invalid post ID", (value) =>
      Types.ObjectId.isValid(value)
    ),
  sharedText: yup.string().optional().max(200, "Shared text must not exceed 200 characters"),
});

const sharePost = async (req, res, next) => {
  try {
    await SHARE_POST_VALIDATION_SCHEMA.validate(req.body);
    const { postId, sharedText } = req.body;
    const userId = req.user._id;

    const post = await postModal.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    // Privacy check: cannot share private posts
    if (post.isPrivate && !post.userId.equals(userId)) {
      return res.status(403).json({
        status: "error",
        message: "Cannot share private posts",
      });
    }

    const share = await shareModel.create({
      userId,
      originalPostId: postId,
      sharedText: sharedText || undefined,
    });

    const populatedShare = await shareModel
      .findById(share._id)
      .populate({
        path: "userId",
        select: "firstname lastname username profilePhoto",
      })
      .populate({
        path: "originalPostId",
        populate: {
          path: "userId",
          select: "firstname lastname username",
        },
      });

    const sharesCount = await shareModel.countDocuments({ originalPostId: postId });

    await eventEmitter("post-shared", {
      share: populatedShare,
      postId,
      userId,
      sharesCount,
      postAuthorId: post.userId,
    });

    return res.status(201).json({
      status: "success",
      data: {
        share: populatedShare,
        sharesCount,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getPostShares = async (req, res, next) => {
  try {
    const { postId } = req.params;
    let { page, perPage } = req.query;

    if (!Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid post ID",
      });
    }

    page = page && page > 0 ? Number(page) - 1 : 0;
    perPage = perPage && perPage > 0 ? Number(perPage) : 20;

    const shares = await shareModel
      .find({ originalPostId: postId })
      .populate({
        path: "userId",
        select: "firstname lastname username profilePhoto",
      })
      .sort({ createdAt: -1 })
      .skip(page * perPage)
      .limit(perPage);

    const totalShares = await shareModel.countDocuments({ originalPostId: postId });

    return res.status(200).json({
      status: "success",
      data: {
        shares,
        pagination: {
          currentPage: page + 1,
          perPage,
          totalItems: totalShares,
          totalPages: Math.ceil(totalShares / perPage),
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const deleteShare = async (req, res, next) => {
  try {
    const { shareId } = req.params;

    if (!Types.ObjectId.isValid(shareId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid share ID",
      });
    }

    const share = await shareModel.findById(shareId);
    if (!share) {
      return res.status(404).json({
        status: "error",
        message: "Share not found",
      });
    }

    if (!share.userId.equals(req.user._id)) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to delete this share",
      });
    }

    const originalPostId = share.originalPostId;
    await shareModel.deleteOne({ _id: shareId });

    const sharesCount = await shareModel.countDocuments({ originalPostId });

    await eventEmitter("share-deleted", {
      shareId,
      originalPostId,
      sharesCount,
    });

    return res.status(200).json({
      status: "success",
      message: "Share deleted successfully",
      data: {
        sharesCount,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  sharePost,
  getPostShares,
  deleteShare,
};
