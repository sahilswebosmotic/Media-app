import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
  Box,
  Avatar,
  useTheme,
} from "@mui/material"
import { useSharePostMutation } from "../../store/slice/postsApi"
import { useToast } from "../../context/toast/useToast"

const SharePostDialog = ({ open, onClose, post }) => {
  const theme = useTheme();
  const { showToast } = useToast();
  const [sharedText, setSharedText] = useState("");
  const [sharePost, { isLoading }] = useSharePostMutation();

  const handleShare = async () => {
    try {
      await sharePost({
        postId: post._id,
        sharedText: sharedText.trim() || undefined,
      }).unwrap();
      showToast("Post shared successfully!", "success");
      setSharedText("");
      onClose();
    } catch (error) {
      showToast("Failed to share post", "error");
      console.error("Failed to share post:", error);
    }
  };

  if (!post) return null;

  const userData = post.userData || post.userId;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle>Share Post</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Add a comment (optional)"
            value={sharedText}
            onChange={(e) => setSharedText(e.target.value)}
            inputProps={{ maxLength: 200 }}
            helperText={`${sharedText.length}/200 characters`}
          />

          {/* Original Post Preview */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              bgcolor:
                theme.palette.mode === "dark" ? "grey.900" : "grey.50",
            }}
          >
            <Stack direction="row" spacing={1.5}>
              <Avatar
                src={userData?.profilePhoto}
                sx={{ width: 32, height: 32 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {userData?.firstname} {userData?.lastname}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  @{userData?.username}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {post.title}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleShare}
          disabled={isLoading}
        >
          {isLoading ? "Sharing..." : "Share"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SharePostDialog;
