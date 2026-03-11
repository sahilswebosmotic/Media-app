
import { Box, Stack, Typography, Button, Alert, useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { useGetFeedPostsQuery } from "@features/feed/api/posts.api"
import SearchBar from "../../../components/ui/SearchBar"
import LoadingScreen from "../../../components/ui/LoadingScreen"
import FeedGrid from "./FeedGrid"
import PostDialog from "./PostDialog"
import CreatePostDialog from './CreatePostDialog/CreatePostDialog';

export default function Feed() {
  const theme = useTheme()
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'))
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))
  const [selectedPost, setSelectedPost] = useState(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [debouncedSearch])

  const { data, isLoading, isError, error, isFetching } = useGetFeedPostsQuery({
    page,
    perPage: 5,
    search: debouncedSearch,
  })
  const width = isSmDown ? "100%" : isMdDown ? "70%" : "60%"


  useEffect(() => {
    if (!data?.data?.data) return

    if (page === 1) {
      setTimeout(() => setPosts(data.data.data), 0)
    } else {
      setTimeout(() => setPosts((prev) => [...prev, ...data.data.data]), 0)
    }
  }, [data, page])

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
    return <LoadingScreen />
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

        <SearchBar
          placeholder="Search posts by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 4,
            maxWidth: 600,
            mx: "auto",
            display: "flex"
          }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        <FeedGrid
          posts={posts}
          width={width}
          onOpenPost={setSelectedPost}
          onDeletePost={handleDeletePost}
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



