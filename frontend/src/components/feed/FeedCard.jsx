import { Card, CardContent, Typography, Button } from "@mui/material"
import FeedImage from "./FeedImage"

const FeedCard = ({ post, onOpen }) => {
  return (
    <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
      <FeedImage
        postId={post._id}
        title={post.title}
        hasImage={Boolean(post.filePath)}
      />

      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {post.title}
        </Typography>

        {post.description && (
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        )}

        <Typography variant="caption" color="text.secondary">
          @{post.userData?.username}
        </Typography>

        <Button variant="outlined" onClick={() => onOpen(post)}>
          Open
        </Button>
      </CardContent>
    </Card>
  )
}

export default FeedCard