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
const router = express.Router();

router.get("/get-user", getUser);
router.get("/get-user-image", getUserImage);
router.put("/update-user", upload.single("profilePhoto"), updateUser);
router.patch("/update-user", upload.single("profilePhoto"), updateUser);
router.get("/get-users-profile", getUserProfile);
router.get("/get-all-user", getAllUsers);
router.delete("/delete-user", deleteUser);

module.exports = router;
