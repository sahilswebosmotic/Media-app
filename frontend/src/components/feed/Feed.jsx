
import { Box, Stack, Typography, Button, CircularProgress, Alert ,useMediaQuery, TextField, InputAdornment,
  useTheme, alpha } from "@mui/material"
  import SearchIcon from "@mui/icons-material/Search"
import { useEffect, useState } from "react"
import { useGetFeedPostsQuery } from "@store/slice/postsApi"
import { useGetCurrentUserQuery } from "@store/slice/authApi"
import FeedGrid from "./FeedGrid"
import PostDialog from "./PostDialog"
import CreatePostDialog from './CreatePostDialog/CreatePostDialog';

const Feed = () => {
  const theme = useTheme()
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'))
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))
  const [selectedPost, setSelectedPost] = useState(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [posts,setPosts] = useState([])
  const [page,setPage] = useState(1)

    const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

    useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1) // Reset page on search
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const { data, isLoading, isError, error, isFetching } = useGetFeedPostsQuery({
    page,
    perPage: 5,
    search: debouncedSearch,
  })
  const width = isSmDown ? "100%" :isMdDown ?"70%" :"60%"
  
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
    // remove the post from ui only 
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
    <Box sx={{ width: "min(1200px, 92vw)", mx: "auto", height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={1.5}
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ mb: 2.5 }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: '-0.02em' }}>
              Explore Feed
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Discover recent posts from the community.
            </Typography>
          </Box>
          <Button variant="contained" onClick={() => setIsCreateOpen(true)} size="large">
            Create Post
          </Button>
        </Stack>

        <TextField
          id="feed-search"
          placeholder="Search posts by title…"
          size="medium"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'primary.main', fontSize: 22 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ 
            mb: 4, 
            maxWidth: 600, 
            mx: "auto",
            display: "flex",
            '& .MuiOutlinedInput-root': {
              bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.48)' : 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.9)',
              },
              '&.Mui-focused': {
                bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : '#fff',
                boxShadow: theme => `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
              }
            }
          }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        <FeedGrid
          posts={posts}
          width={width}
          onOpenPost={setSelectedPost}
          onDeletePost={handleDeletePost}
          currentUserId={currentUserId}
          hasMore={hasMore}
          loadMore={loadMore}
          isFetching={isFetching}
        />
      </Box>

      <PostDialog
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      <CreatePostDialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

    </Box>
  )
}

export default Feed

