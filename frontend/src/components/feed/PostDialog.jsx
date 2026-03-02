import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography } from "@mui/material"
import FeedImage from "./FeedImage"

const PostDialog = ({ post, onClose }) => {
  return (
    <Dialog open={Boolean(post)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{post?.title}</DialogTitle>

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

            <Typography>{post.description}</Typography>

            <Typography variant="caption">
              @{post.userData?.username}
            </Typography>

            <Typography variant="caption">
              {post.isPrivate ? "Private Post" : "Public Post"}
            </Typography>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PostDialog