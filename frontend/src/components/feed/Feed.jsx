
import { Box, Stack, Typography, Button, CircularProgress, Alert ,useMediaQuery, TextField, InputAdornment,
  useTheme, } from "@mui/material"
  import {ArrowBackIos,ArrowForwardIos} from "@mui/icons-material"
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

  const { data, isLoading, isError, error } = useGetFeedPostsQuery({
    page,
    perPage: 5,
    search: debouncedSearch,
  })
  const width = isSmDown ? "100%" :isMdDown ?"70%" :"60%"
  
  const { data: currentUserData } = useGetCurrentUserQuery()
  const currentUserId = currentUserData?.data?._id
  useEffect(()=>{
    setPosts(data?.data?.data ?? [])
  },[data])

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil((data?.data?.total || 0) / 5);

  const handleDeletePost = (post) => {
    // remove the post from ui only 
    setPosts(posts.filter((p) => p._id !== post._id))
  }


  if (isLoading) {
    return (
      <Box sx={{ minHeight: "45vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    )
  }
  if (isError) return <Alert severity="error">{error?.data?.message}</Alert>

  return (
    <Box sx={{ width: "min(1200px, 92vw)", mx: "auto" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={1.5}
        alignItems={{ xs: "flex-start", sm: "center" }}
        sx={{ mb: 2.5 }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Explore Feed
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discover recent posts from the community.
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => setIsCreateOpen(true)}>
          Create Post
        </Button>
      </Stack>

      <TextField
        id="feed-search"
        placeholder="Search posts by title…"
        size="small"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 2.5, display: "flex", maxWidth:420 , mx:"auto" }}
      />

      <FeedGrid
        posts={posts}
        width={width}
        onOpenPost={setSelectedPost}
        onDeletePost={handleDeletePost}
        currentUserId={currentUserId}
      />

      <Stack direction="row" justifyContent="center" sx={{ mt: 4, mb: 2 }} spacing={2}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIos />}
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          size="small"
        >
          Previous
        </Button>
        <Typography sx={{ alignSelf: 'center' }}>
          Page {page} of {totalPages || 1}
        </Typography>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIos />}
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          size="small"
        >
          Next
        </Button>
      </Stack>

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

