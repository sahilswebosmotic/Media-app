import { Box, CircularProgress, CardMedia } from "@mui/material"
import { useGetFeedImageQuery } from "@store/slice/postsApi"

const FeedImage = ({ postId, title, hasImage }) => {
  const { data, isLoading } = useGetFeedImageQuery(
    { postId },
    { skip: !hasImage }
  )

  if (!hasImage) return null

  if (isLoading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: 180 }}>
        <CircularProgress size={22} />
      </Box>
    )
  }

  if (!data?.imageData) return null

  return (
    <CardMedia
      component="img"
      image={data.imageData}
      alt={title}
      sx={{ height: 220, objectFit: "cover" }}
    />
  )
}

export default FeedImage