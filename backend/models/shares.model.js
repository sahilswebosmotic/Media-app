const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    originalPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    sharedText: {
      type: String,
      required: false,
      maxlength: 200,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

shareSchema.index({ userId: 1, createdAt: -1 });
shareSchema.index({ originalPostId: 1 });

const shareModel = mongoose.model("shares", shareSchema);

module.exports = shareModel;
