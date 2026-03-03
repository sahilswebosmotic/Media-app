import { ImageList, ImageListItem } from "@mui/material"
import FeedCard from "./FeedCard"

const FeedGrid = ({ posts, width, onOpenPost ,onDeletePost,currentUserId }) => {
  return (
    <ImageList
      variant="masonry"
      cols={1}
      gap={14}
      sx={{
        overflow: "visible",
        margin: "auto",
        width:width,
      }}
    >
      {posts.map((post) => (
        <ImageListItem key={post._id}>
          <FeedCard post={post} onOpen={onOpenPost} onDelete={onDeletePost} currentUserId={currentUserId} />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default FeedGrid
