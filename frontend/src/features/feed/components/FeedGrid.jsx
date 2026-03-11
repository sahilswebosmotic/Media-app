import React from "react"
import { Box, CircularProgress, ImageList, ImageListItem } from "@mui/material"
import { Virtuoso } from "react-virtuoso"
import FeedCard from "./FeedCard"

export default function FeedGrid({ posts, width, onOpenPost, onDeletePost, loadMore, isFetching }) {
  return (
    <Box sx={{ width: width, margin: "auto", height: "100%" }}>
      <Virtuoso
        data={posts}
        useWindowScroll={false}
        endReached={loadMore}
        increaseViewportBy={200}
        style={{ height: '100%' }}
        itemContent={(index, post) => (
          <Box sx={{ mb: 2 }}>
            <FeedCard
              post={post}
              onOpen={onOpenPost}
              onDelete={onDeletePost}
            />
          </Box>
        )}
        components={{
          Footer: () => (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, visibility: isFetching ? 'visible' : 'hidden' }}>
              <CircularProgress size={24} />
            </Box>
          ),
          Scroller: React.forwardRef(({ style, ...props }, ref) => (
            <Box
              {...props}
              ref={ref}
              style={{ ...style, scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
            />
          ))
        }}
      />
    </Box>
  )
}


