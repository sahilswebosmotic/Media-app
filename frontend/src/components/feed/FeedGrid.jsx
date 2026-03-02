import { ImageList, ImageListItem } from "@mui/material"
import FeedCard from "./FeedCard"

const FeedGrid = ({ posts, cols, onOpenPost }) => {
  return (
    <ImageList variant="masonry" cols={cols} gap={12}>
      {posts.map((post) => (
        <ImageListItem key={post._id}>
          <FeedCard post={post} onOpen={onOpenPost} />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default FeedGrid