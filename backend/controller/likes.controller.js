const likeModel = require("../models/likes.model");
const postModal = require("../models/posts.modal");
const yup = require("yup");
const { Types } = require("mongoose");
const { eventEmitter } = require("../utils/socketServer");

const LIKE_POST_VALIDATION_SCHEMA = yup.object({
  postId: yup
    .string()
    .required("Post ID is required")
    .test("is-valid-objectid", "Invalid post ID", (value) =>
      Types.ObjectId.isValid(value)
    ),
});

const likePost = async (req, res, next) => {
  try {
    await LIKE_POST_VALIDATION_SCHEMA.validate(req.body);
    const { postId } = req.body;
    const userId = req.user._id;

    const post = await postModal.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    // Privacy check: only post author can like private posts
    if (post.isPrivate && !post.userId.equals(userId)) {
      return res.status(403).json({
        status: "error",
        message: "Cannot like private posts",
      });
    }

    const existingLike = await likeModel.findOne({ userId, postId });

    let isLiked;
    if (existingLike) {
      await likeModel.deleteOne({ _id: existingLike._id });
      isLiked = false;
    } else {
      await likeModel.create({ userId, postId });
      isLiked = true;
    }

    const likesCount = await likeModel.countDocuments({ postId });

    await eventEmitter(
      isLiked ? "post-liked" : "post-unliked",
      { postId, userId, likesCount, postAuthorId: post.userId },
      false
    );

    return res.status(200).json({
      status: "success",
      data: {
        isLiked,
        likesCount,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getPostLikes = async (req, res, next) => {
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

    const likes = await likeModel
      .find({ postId })
      .populate({
        path: "userId",
        select: "firstname lastname username profilePhoto",
      })
      .sort({ createdAt: -1 })
      .skip(page * perPage)
      .limit(perPage);

    const totalLikes = await likeModel.countDocuments({ postId });

    return res.status(200).json({
      status: "success",
      data: {
        likes,
        pagination: {
          currentPage: page + 1,
          perPage,
          totalItems: totalLikes,
          totalPages: Math.ceil(totalLikes / perPage),
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const isPostLiked = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    if (!Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid post ID",
      });
    }

    const like = await likeModel.findOne({ userId, postId });

    return res.status(200).json({
      status: "success",
      data: {
        isLiked: !!like,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  likePost,
  getPostLikes,
  isPostLiked,
};
