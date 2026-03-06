import { Box, CircularProgress, Alert, useTheme, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { useGetFeedPostsQuery } from "@store/slice/postsApi"
import { useGetCurrentUserQuery } from "@store/slice/authApi"
import FeedGrid from "./FeedGrid"
import PostDialog from "./PostDialog"
import CreatePostDialog from './CreatePostDialog/CreatePostDialog';
import CreatePostInput from "./CreatePostInput";

const Feed = () => {
  const theme = useTheme()
  const { setIsCreateOpen: setGlobalCreateOpen, setInitialPostText } = useOutletContext()
  const [selectedPost, setSelectedPost] = useState(null)
  const [posts,setPosts] = useState([])
  const [page,setPage] = useState(1)

  const { data, isLoading, isError, error, isFetching } = useGetFeedPostsQuery({
    page,
    perPage: 5,
    search: '', // Search moved to Navbar
  })
  
  const { data: currentUserData } = useGetCurrentUserQuery()
  const currentUserId = currentUserData?.data?._id

  useEffect(()=>{
    if (!data?.data?.data) return

    if (page === 1) {
      setPosts(data.data.data)
    } else {
      setPosts((prev) => [...prev, ...data.data.data])
    }
  },[data])

  const totalPosts = data?.data?.total || 0;
  const totalPages = Math.ceil(totalPosts / 5);
  const hasMore = posts.length < totalPosts;

  const loadMore = () => {
    if (hasMore && !isLoading && !isFetching && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handleDeletePost = (post) => {
    setPosts(posts.filter((p) => p._id !== post._id))
  }

  if (isLoading && page === 1) {
    return (
      <Box sx={{ minHeight: "45vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    )
  }
  if (isError) return <Alert severity="error">{error?.data?.message}</Alert>

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CreatePostInput 
        onOpenCreateDialog={(text) => {
          setInitialPostText(text);
          setGlobalCreateOpen(true);
        }} 
      />

      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        {posts.length > 0 ? (
          <FeedGrid
            posts={posts}
            width="100%"
            onOpenPost={setSelectedPost}
            onDeletePost={handleDeletePost}
            currentUserId={currentUserId}
            hasMore={hasMore}
            loadMore={loadMore}
            isFetching={isFetching}
          />
        ) : !isFetching && (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No posts yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Follow some people or create your own post!
            </Typography>
          </Box>
        )}
      </Box>

      <PostDialog
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </Box>
  )
}

export default Feed

