const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    filePath: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "createdAt" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual("likesCount", {
  ref: "likes",
  localField: "_id",
  foreignField: "postId",
  count: true,
});

postSchema.virtual("commentsCount", {
  ref: "comments",
  localField: "_id",
  foreignField: "postId",
  count: true,
});

postSchema.virtual("sharesCount", {
  ref: "shares",
  localField: "_id",
  foreignField: "originalPostId",
  count: true,
});

const postModal = mongoose.model("posts", postSchema);

module.exports = postModal;
