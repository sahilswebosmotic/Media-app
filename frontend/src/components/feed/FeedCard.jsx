import { Card, CardContent, Typography, Button, Stack, Chip } from "@mui/material"
import FeedImage from "./FeedImage"

const FeedCard = ({ post, onOpen }) => {
  return (
    <Card
      sx={{
        borderRadius: 3.2,
        overflow: "hidden",
        border: "1px solid rgba(148, 163, 184, 0.2)",
        boxShadow: "0 14px 28px rgba(2, 6, 23, 0.35)",
      }}
    >
      <FeedImage
        postId={post._id}
        title={post.title}
        hasImage={Boolean(post.filePath)}
      />

      <CardContent sx={{ p: 2 }}>
        <Stack spacing={1.2}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
          {post.title}
        </Typography>

        {post.description && (
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
            {post.description}
          </Typography>
        )}

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

        <Button variant="outlined" onClick={() => onOpen(post)} sx={{ alignSelf: "flex-start", mt: 0.5 }}>
          Open
        </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default FeedCard
