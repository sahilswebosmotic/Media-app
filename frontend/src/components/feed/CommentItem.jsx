import { useState } from "react"
import {
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  useTheme,
} from "@mui/material"
import {
  MoreVert as MoreIcon,
  ChatBubbleOutline as ReplyIcon,
} from "@mui/icons-material"
import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentRepliesQuery,
} from "../../store/slice/commentsApi"
import AddComment from "./AddComment"

const CommentItem = ({ comment, postId, isReply = false }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const [updateComment, { isLoading: isUpdating }] = useUpdateCommentMutation();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();
  
  const { data: repliesData } = useGetCommentRepliesQuery(
    { commentId: comment._id, page: 1, perPage: 5 },
    { skip: !showReplies || isReply }
  );

  const userData = comment.userId;
  const replies = repliesData?.data?.replies || [];

  const handleMenuOpen = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(comment.text);
  };

  const handleSaveEdit = async () => {
    try {
      await updateComment({ commentId: comment._id, text: editText }).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(comment._id).unwrap();
      handleMenuClose();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <Box sx={{ pl: isReply ? 4 : 0 }}>
      <Stack direction="row" spacing={1.5}>
        <Avatar
          src={userData?.profilePhoto}
          sx={{ width: 36, height: 36, mt: 0.5 }}
        />
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.100",
              borderRadius: 2,
              p: 1.5,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {userData?.firstname} {userData?.lastname}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  @{userData?.username}
                </Typography>
              </Box>
              <IconButton size="small" onClick={handleMenuOpen}>
                <MoreIcon fontSize="small" />
              </IconButton>
            </Stack>

            {isEditing ? (
              <Box sx={{ mt: 1 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  size="small"
                  autoFocus
                />
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleSaveEdit}
                    disabled={isUpdating || !editText.trim()}
                  >
                    Save
                  </Button>
                  <Button size="small" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </Stack>
              </Box>
            ) : (
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {comment.text}
              </Typography>
            )}
          </Box>

          {!isReply && (
            <Stack direction="row" spacing={2} sx={{ mt: 0.5, ml: 1 }}>
              <Button
                size="small"
                startIcon={<ReplyIcon />}
                onClick={() => setShowReplyInput(!showReplyInput)}
                sx={{ textTransform: "none" }}
              >
                Reply
              </Button>
              {replies.length > 0 && !showReplies && (
                <Button
                  size="small"
                  onClick={() => setShowReplies(true)}
                  sx={{ textTransform: "none" }}
                >
                  View {replies.length} {replies.length === 1 ? "reply" : "replies"}
                </Button>
              )}
              {showReplies && (
                <Button
                  size="small"
                  onClick={() => setShowReplies(false)}
                  sx={{ textTransform: "none" }}
                >
                  Hide replies
                </Button>
              )}
            </Stack>
          )}

          {showReplyInput && (
            <Box sx={{ mt: 1 }}>
              <AddComment
                postId={postId}
                parentCommentId={comment._id}
                onSuccess={() => setShowReplyInput(false)}
              />
            </Box>
          )}

          {showReplies && replies.length > 0 && (
            <Stack spacing={2} sx={{ mt: 2 }}>
              {replies.map((reply) => (
                <CommentItem
                  key={reply._id}
                  comment={reply}
                  postId={postId}
                  isReply={true}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Stack>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CommentItem;
