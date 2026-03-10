import React from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Skeleton,
} from "@mui/material";
import PublicPostCard from "./PublicPostCard";

const PublicProfilePosts = ({ posts, isLoading, isError, onOpenPost }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Posts
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {isLoading ? (
          Array.from(new Array(6)).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton
                variant="rectangular"
                height={220}
                sx={{ borderRadius: 3 }}
              />
            </Grid>
          ))
        ) : isError ? (
          <Grid item xs={12}>
            <Typography color="error">Failed to load posts</Typography>
          </Grid>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
              <PublicPostCard post={post} onOpen={onOpenPost} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography color="text.secondary">
              No posts yet.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PublicProfilePosts;
