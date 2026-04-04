const followModel = require("../models/follows.model");
const userModel = require("../models/users.model");
const yup = require("yup");
const { Types } = require("mongoose");
const { eventEmitter } = require("../utils/socketServer");

const FOLLOW_USER_VALIDATION_SCHEMA = yup.object({
  userId: yup
    .string()
    .required("User ID is required")
    .test("is-valid-objectid", "Invalid user ID", (value) =>
      Types.ObjectId.isValid(value)
    ),
});

const followUser = async (req, res, next) => {
  try {
    await FOLLOW_USER_VALIDATION_SCHEMA.validate(req.body);
    const { userId: followingId } = req.body;
    const followerId = req.user._id;

    if (String(followerId) === String(followingId)) {
      return res.status(400).json({
        status: "error",
        message: "You cannot follow yourself",
      });
    }

    const userToFollow = await userModel.findById(followingId);
    if (!userToFollow) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const existingFollow = await followModel.findOne({
      followerId,
      followingId,
    });

    let isFollowing;
    if (existingFollow) {
      await followModel.deleteOne({ _id: existingFollow._id });
      isFollowing = false;
    } else {
      await followModel.create({ followerId, followingId });
      isFollowing = true;
    }

    const followersCount = await followModel.countDocuments({ followingId });
    const followingCount = await followModel.countDocuments({ followerId });

    if (isFollowing) {
      await eventEmitter("new-follower", {
        followerId,
        followingId,
        followersCount,
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        isFollowing,
        followersCount,
        followingCount,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getFollowers = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let { page, perPage } = req.query;

    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid user ID",
      });
    }

    page = page && page > 0 ? Number(page) - 1 : 0;
    perPage = perPage && perPage > 0 ? Number(perPage) : 20;

    const followers = await followModel
      .find({ followingId: userId })
      .populate({
        path: "followerId",
        select: "firstname lastname username profilePhoto isPrivate",
      })
      .sort({ createdAt: -1 })
      .skip(page * perPage)
      .limit(perPage);

    const totalFollowers = await followModel.countDocuments({
      followingId: userId,
    });

    return res.status(200).json({
      status: "success",
      data: {
        followers: followers.map((f) => f.followerId),
        pagination: {
          currentPage: page + 1,
          perPage,
          totalItems: totalFollowers,
          totalPages: Math.ceil(totalFollowers / perPage),
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const getFollowing = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let { page, perPage } = req.query;

    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid user ID",
      });
    }

    page = page && page > 0 ? Number(page) - 1 : 0;
    perPage = perPage && perPage > 0 ? Number(perPage) : 20;

    const following = await followModel
      .find({ followerId: userId })
      .populate({
        path: "followingId",
        select: "firstname lastname username profilePhoto isPrivate",
      })
      .sort({ createdAt: -1 })
      .skip(page * perPage)
      .limit(perPage);

    const totalFollowing = await followModel.countDocuments({
      followerId: userId,
    });

    return res.status(200).json({
      status: "success",
      data: {
        following: following.map((f) => f.followingId),
        pagination: {
          currentPage: page + 1,
          perPage,
          totalItems: totalFollowing,
          totalPages: Math.ceil(totalFollowing / perPage),
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const isFollowing = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const followerId = req.user._id;

    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid user ID",
      });
    }

    const follow = await followModel.findOne({
      followerId,
      followingId: userId,
    });

    return res.status(200).json({
      status: "success",
      data: {
        isFollowing: !!follow,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  followUser,
  getFollowers,
  getFollowing,
  isFollowing,
};
