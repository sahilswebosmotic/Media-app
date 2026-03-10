import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Modal,
} from "@mui/material";
import FeedImage from "@features/feed/components/FeedImage";

const PostDetailModal = ({ open, onClose, post }) => {
  if (!post) return null;

  return (
    <Modal open={open} onClose={onClose} keepMounted>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 500 },
          outline: "none",
        }}
      >
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Box sx={{ height: "100%", width: "100%", overflow: "hidden" }}>
            <FeedImage
              postId={post._id}
              title={post.title}
              hasImage={Boolean(post.filePath)}
            />
          </Box>

          <Box sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {post.title}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2, wordWrap: "break-word" }}
            >
              {post.description}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Created: {new Date(post.createdAt).toLocaleString()}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Updated: {new Date(post.updatedAt).toLocaleString()}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default PostDetailModal;
