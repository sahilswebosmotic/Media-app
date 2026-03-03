import { Dialog, DialogTitle, DialogContent, DialogActions,Chip, Button, Stack, Typography } from "@mui/material"
import FeedImage from "./FeedImage"

const PostDialog = ({ post, onClose }) => {
  return (
    <Dialog
      open={Boolean(post)}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          border: "1px solid rgba(148, 163, 184, 0.2)",
          bgcolor: "rgba(15, 23, 42, 0.96)",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1.2, fontWeight: 800 }}>{post?.title}</DialogTitle>

      <DialogContent dividers>
        {post && (
          <Stack spacing={2}>
            {post.filePath && (
              <FeedImage
                postId={post._id}
                title={post.title}
                hasImage={Boolean(post.filePath)}
              />
            )}

            <Typography  sx={{whiteSpace : 'normal' ,wordBreak:'break-word'}} color="text.secondary">{post.description || "No description provided."}</Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" color="text.secondary">
          @{post.userData?.username}
        </Typography>
          <Chip
            size="small"
            label={post.isPrivate ? "Private" : "Public"}
            color={post.isPrivate ? "warning" : "info"}
            variant="outlined"
            sx={{ height: 22 }}
          />
        </Stack>
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button variant="outlined" onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PostDialog
