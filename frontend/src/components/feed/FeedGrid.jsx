import React from "react"
import { Box, CircularProgress, ImageList, ImageListItem } from "@mui/material"
import { Virtuoso } from "react-virtuoso"
import FeedCard from "./FeedCard"

const FeedGrid = ({ posts, width, onOpenPost, onDeletePost, currentUserId, hasMore, loadMore, isFetching }) => {
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
              currentUserId={currentUserId} 
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
            <div
              {...props}
              ref={ref}
              style={{
                ...style,
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' }
              }}
            />
          ))
        }}
      />
    </Box>
  )
}

export default FeedGrid
