const commentModel = require("../models/comments.model");
const postModal = require("../models/posts.modal");
const yup = require("yup");
const { Types } = require("mongoose");
const { eventEmitter } = require("../utils/socketServer");

const CREATE_COMMENT_VALIDATION_SCHEMA = yup.object({
  postId: yup
    .string()
    .required("Post ID is required")
    .test("is-valid-objectid", "Invalid post ID", (value) =>
      Types.ObjectId.isValid(value)
    ),
  text: yup
    .string()
    .required("Comment text is required")
    .min(1, "Comment must be at least 1 character")
    .max(500, "Comment must not exceed 500 characters"),
  parentCommentId: yup
    .string()
    .optional()
    .test("is-valid-objectid", "Invalid parent comment ID", (value) =>
      !value || Types.ObjectId.isValid(value)
    ),
});

const UPDATE_COMMENT_VALIDATION_SCHEMA = yup.object({
  text: yup
    .string()
    .required("Comment text is required")
    .min(1, "Comment must be at least 1 character")
    .max(500, "Comment must not exceed 500 characters"),
});

const createComment = async (req, res, next) => {
  try {
    await CREATE_COMMENT_VALIDATION_SCHEMA.validate(req.body);
    const { postId, text, parentCommentId } = req.body;
    const userId = req.user._id;

    const post = await postModal.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    // Privacy check: only post author can comment on private posts
    if (post.isPrivate && !post.userId.equals(userId)) {
      return res.status(403).json({
        status: "error",
        message: "Cannot comment on private posts",
      });
    }

    if (parentCommentId) {
      const parentComment = await commentModel.findById(parentCommentId);
      if (!parentComment) {
        return res.status(404).json({
          status: "error",
          message: "Parent comment not found",
        });
      }
    }

    const comment = await commentModel.create({
      userId,
      postId,
      text,
      parentCommentId: parentCommentId || undefined,
    });

    const populatedComment = await commentModel
      .findById(comment._id)
      .populate({
        path: "userId",
        select: "firstname lastname username profilePhoto",
      });

    const commentsCount = await commentModel.countDocuments({ postId });

    await eventEmitter("new-comment", {
      comment: populatedComment,
      postId,
      commentsCount,
      postAuthorId: post.userId,
    });

    return res.status(201).json({
      status: "success",
      data: {
        comment: populatedComment,
        commentsCount,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getPostComments = async (req, res, next) => {
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
    perPage = perPage && perPage > 0 ? Number(perPage) : 10;

    const comments = await commentModel
      .find({ postId, parentCommentId: { $exists: false } })
      .populate({
        path: "userId",
        select: "firstname lastname username profilePhoto",
      })
      .sort({ createdAt: -1 })
      .skip(page * perPage)
      .limit(perPage);

    const totalComments = await commentModel.countDocuments({
      postId,
      parentCommentId: { $exists: false },
    });

    return res.status(200).json({
      status: "success",
      data: {
        comments,
        pagination: {
          currentPage: page + 1,
          perPage,
          totalItems: totalComments,
          totalPages: Math.ceil(totalComments / perPage),
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const getCommentReplies = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    let { page, perPage } = req.query;

    if (!Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid comment ID",
      });
    }

    page = page && page > 0 ? Number(page) - 1 : 0;
    perPage = perPage && perPage > 0 ? Number(perPage) : 5;

    const replies = await commentModel
      .find({ parentCommentId: commentId })
      .populate({
        path: "userId",
        select: "firstname lastname username profilePhoto",
      })
      .sort({ createdAt: 1 })
      .skip(page * perPage)
      .limit(perPage);

    const totalReplies = await commentModel.countDocuments({
      parentCommentId: commentId,
    });

    return res.status(200).json({
      status: "success",
      data: {
        replies,
        pagination: {
          currentPage: page + 1,
          perPage,
          totalItems: totalReplies,
          totalPages: Math.ceil(totalReplies / perPage),
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    await UPDATE_COMMENT_VALIDATION_SCHEMA.validate(req.body);

    if (!Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid comment ID",
      });
    }

    const comment = await commentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: "Comment not found",
      });
    }

    if (!comment.userId.equals(req.user._id)) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to update this comment",
      });
    }

    comment.text = req.body.text;
    await comment.save();

    const populatedComment = await commentModel
      .findById(comment._id)
      .populate({
        path: "userId",
        select: "firstname lastname username profilePhoto",
      });

    await eventEmitter("comment-updated", {
      comment: populatedComment,
    });

    return res.status(200).json({
      status: "success",
      data: {
        comment: populatedComment,
      },
    });
  } catch (e) {
    next(e);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    if (!Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid comment ID",
      });
    }

    const comment = await commentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: "Comment not found",
      });
    }

    if (!comment.userId.equals(req.user._id)) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to delete this comment",
      });
    }

    const postId = comment.postId;

    await commentModel.deleteMany({
      $or: [{ _id: commentId }, { parentCommentId: commentId }],
    });

    const commentsCount = await commentModel.countDocuments({ postId });

    await eventEmitter("comment-deleted", {
      commentId,
      postId,
      commentsCount,
    });

    return res.status(200).json({
      status: "success",
      message: "Comment deleted successfully",
      data: {
        commentsCount,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createComment,
  getPostComments,
  getCommentReplies,
  updateComment,
  deleteComment,
};
