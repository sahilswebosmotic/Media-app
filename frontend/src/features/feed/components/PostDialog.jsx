import { Chip, Button, Stack, Typography } from "@mui/material"
import FeedImage from "./FeedImage"
import BaseDialog from "../../../components/ui/BaseDialog"

export default function PostDialog({ post, onClose }) {
  return (
    <BaseDialog
      open={Boolean(post)}
      onClose={onClose}
      title={post?.title}
      actions={<Button variant="outlined" onClick={onClose}>Close</Button>}
    >
      {post && (
        <Stack spacing={2}>
          {post.filePath && (
            <FeedImage
              postId={post._id}
              title={post.title}
              hasImage={Boolean(post.filePath)}
            />
          )}

          <Typography sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }} color="text.secondary">{post.description || "No description provided."}</Typography>

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
    </BaseDialog>
  )
}

