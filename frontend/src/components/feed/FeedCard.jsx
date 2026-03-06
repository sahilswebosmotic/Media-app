import { Card, CardContent, Typography, Button, Stack, Chip } from "@mui/material"
import FeedImage from "./FeedImage"

const FeedCard = ({ post, onOpen ,onDelete,currentUserId  }) => {
  return (
    <Card
      sx={{
        borderRadius: 3.2,
        overflow: "hidden",
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
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 ,whiteSpace : 'normal' ,overflow :'hidden'}}>
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
          <Typography variant="caption" color="text.secondary">
          {post.createdAt.slice(0,10)} 
        </Typography>

        <Stack direction="row" spacing={1}>
        <Button variant="outlined" onClick={() => onOpen(post)} sx={{ alignSelf: "flex-start", mt: 0.5 }}>
          Open
        </Button>
        {post.userId === currentUserId && (
          <Button variant="outlined" onClick={() => onDelete(post)} sx={{ alignSelf: "flex-start", mt: 0.5 }}>
            Delete
          </Button>
        )}
        </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default FeedCard
