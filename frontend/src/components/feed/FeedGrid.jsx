import { ImageList, ImageListItem } from "@mui/material"
import FeedCard from "./FeedCard"

const FeedGrid = ({ posts, cols, onOpenPost ,onDeletePost }) => {
  return (
    <ImageList
      variant="masonry"
      cols={cols}
      gap={14}
      sx={{
        overflow: "visible",
        my: 0,
      }}
    >
      {posts.map((post) => (
        <ImageListItem key={post._id}>
          <FeedCard post={post} onOpen={onOpenPost} onDelete={onDeletePost} />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default FeedGrid
