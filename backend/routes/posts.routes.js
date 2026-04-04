const express = require("express");
const upload = require("../middleware/multer");
const {
  createPost,
  getFeedPost,
  getUsersPosts,
  getImage,
} = require("../controller/posts.controller");
const {
  likePost,
  getPostLikes,
  isPostLiked,
} = require("../controller/likes.controller");
const {
  createComment,
  getPostComments,
  getCommentReplies,
  updateComment,
  deleteComment,
} = require("../controller/comments.controller");
const {
  sharePost,
  getPostShares,
  deleteShare,
} = require("../controller/shares.controller");
const router = express.Router();

router.post("/create-post", upload.single("image"), createPost);
router.get("/get-feed-posts", getFeedPost);
router.get("/get-user-posts", getUsersPosts);
router.get("/get-feed-image", getImage);

// Likes routes
router.post("/like-post", likePost);
router.get("/:postId/likes", getPostLikes);
router.get("/:postId/is-liked", isPostLiked);

// Comments routes
router.post("/comment", createComment);
router.get("/:postId/comments", getPostComments);
router.get("/comments/:commentId/replies", getCommentReplies);
router.put("/comments/:commentId", updateComment);
router.delete("/comments/:commentId", deleteComment);

// Shares routes
router.post("/share", sharePost);
router.get("/:postId/shares", getPostShares);
router.delete("/shares/:shareId", deleteShare);

module.exports = router;
