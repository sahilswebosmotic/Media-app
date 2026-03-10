import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Paper,
  Divider,
  Skeleton,
  alpha,
  Modal,
} from "@mui/material";
import { useParams } from "react-router-dom";

import { useGetUserImageQuery, useGetUserQuery } from "@store/slice/usersApi";
import { useGetFeedPostsQuery } from "@store/slice/postsApi";

import FeedImage from "@components/feed/FeedImage";

export default function PublicProfile() {
  const { userId } = useParams();

  const [page] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  const handleOpen = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetUserQuery({ userId });


  const { data: imageData, isLoading: imageLoading } =
    useGetUserImageQuery({ userId });

  const {
    data: postsResponse,
    isLoading: postsLoading,
    isError: postsError,
  } = useGetFeedPostsQuery({
    userId,
    page,
    perPage: 5,
  });

  const posts = postsResponse?.data?.data || [];
  console.log(posts)
  const userPost = posts.filter((post)=>post.userId === post.userId);
  console.log( userPost);
  const totalPosts = postsResponse?.data?.total || 0;

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          {/* Profile Header */}

          <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            <Grid container spacing={4} alignItems="center">
              {/* Avatar */}

              <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
                {imageLoading ? (
                  <Skeleton variant="circular" width={96} height={96} />
                ) : (
                  <Avatar
                    src={imageData?.imageData}
                    sx={{
                      width: 100,
                      height: 100,
                      border: (theme) =>
                        `3px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                    }}
                  />
                )}
              </Grid>

              {/* User Info */}

              <Grid item xs={12} md={9}>
                {profileLoading ? (
                  <>
                    <Skeleton variant="text" width={250} height={40} />
                    <Skeleton variant="text" width={150} height={24} />

                    <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
                      <Skeleton variant="text" width={80} />
                      <Skeleton variant="text" width={80} />
                      <Skeleton variant="text" width={80} />
                    </Box>
                  </>
                ) : profileError ? (
                  <Typography color="error">
                    Failed to load profile data
                  </Typography>
                ) : (
                  <>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {profileData?.data?.firstname}{" "}
                        {profileData?.data?.lastname}
                      </Typography>

                    </Box>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      @{profileData?.data?.username}
                    </Typography>

                    {/* Stats */}

                    <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
                      <Typography>
                        <b>{totalPosts}</b> Posts
                      </Typography>

                      <Typography>
                        <b>0</b> Followers
                      </Typography>

                      <Typography>
                        <b>0</b> Following
                      </Typography>
                    </Box>

                    {/* Bio */}

                    <Typography sx={{ mt: 2, maxWidth: 500 }}>
                      Passionate developer 🚀 | Love building scalable web apps
                      | Exploring React & system design.
                    </Typography>
                  </>
                )}
              </Grid>
            </Grid>
          </Paper>

          {/* Posts */}

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Posts
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              {postsLoading ? (
                Array.from(new Array(6)).map((_, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Skeleton
                      variant="rectangular"
                      height={220}
                      sx={{ borderRadius: 3 }}
                    />
                  </Grid>
                ))
              ) : postsError ? (
                <Grid item xs={12}>
                  <Typography color="error">Failed to load posts</Typography>
                </Grid>
              ) : userPost.length > 0 ? (
                userPost.map((post) => (
                  <Grid item xs={12} sm={6} md={4} key={post._id}>
                    <Paper
                      elevation={2}
                      sx={{
                        borderRadius: 2,
                        transition: "0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      {/* Image */}

                      <Box
                        sx={{
                          borderRadius: 2,
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <FeedImage
                          postId={post._id}
                          title={post.title}
                          hasImage={Boolean(post.filePath)}
                        />
                      </Box>

                      {/* Content */}

                      <Box sx={{ p: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            mt: 1.25,
                            mb: 0.25,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {post.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 1,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {post.description}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Created:{" "}
                              {new Date(
                                post.createdAt
                              ).toLocaleDateString()}
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Updated:{" "}
                              {new Date(
                                post.updatedAt
                              ).toLocaleDateString()}
                            </Typography>
                          </Box>

                          <Button
                            variant="outlined"
                            onClick={() => handleOpen(post)}
                          >
                            View
                          </Button>
                        </Box>
                      </Box>
                    </Paper>
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
        </Box>
      </Container>

      {/* Modal */}

      <Modal open={open} onClose={handleClose} keepMounted>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            outline: "none",
          }}
        >
          {selectedPost && (
            <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
              <Box sx={{ height: "100%", width: "100%", overflow: "hidden" }}>
                <FeedImage
                  postId={selectedPost._id}
                  title={selectedPost.title}
                  hasImage={Boolean(selectedPost.filePath)}
                />
              </Box>

              <Box sx={{ p: 3 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {selectedPost.title}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2,wordWrap:'break-word' }}
                >
                  {selectedPost.description}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Created:{" "}
                  {new Date(
                    selectedPost.createdAt
                  ).toLocaleString()}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  Updated:{" "}
                  {new Date(
                    selectedPost.updatedAt
                  ).toLocaleString()}
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>
      </Modal>
    </>
  );
}
// ```


