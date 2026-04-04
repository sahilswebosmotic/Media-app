const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
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

followSchema.index({ followerId: 1, followingId: 1 }, { unique: true });
followSchema.index({ followingId: 1, createdAt: -1 });

followSchema.pre("save", function (next) {
  if (this.followerId.equals(this.followingId)) {
    const error = new Error("Users cannot follow themselves");
    return next(error);
  }
  next();
});

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;
