const express = require("express");
const upload = require("../middleware/multer");
const {
  getUser,
  updateUser,
  getUserImage,
  getUserProfile,
  getAllUsers,
  deleteUser,
} = require("../controller/users.controller");
const {
  followUser,
  getFollowers,
  getFollowing,
  isFollowing,
} = require("../controller/follows.controller");
const router = express.Router();

router.get("/get-user", getUser);
router.get("/get-user-image", getUserImage);
router.put("/update-user", upload.single("profilePhoto"), updateUser);
router.patch("/update-user", upload.single("profilePhoto"), updateUser);
router.get("/get-users-profile", getUserProfile);
router.get("/get-all-user", getAllUsers);
router.delete("/delete-user", deleteUser);

// Follow routes
router.post("/follow", followUser);
router.get("/:userId/followers", getFollowers);
router.get("/:userId/following", getFollowing);
router.get("/:userId/is-following", isFollowing);

module.exports = router;
