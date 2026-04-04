const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },
    profilePhoto: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("followersCount", {
  ref: "follows",
  localField: "_id",
  foreignField: "followingId",
  count: true,
});

userSchema.virtual("followingCount", {
  ref: "follows",
  localField: "_id",
  foreignField: "followerId",
  count: true,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
