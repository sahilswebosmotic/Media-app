import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { useGetUserImageQuery, useGetUserQuery } from "@features/profile/api/users.api";
import { useGetFeedPostsQuery } from "@features/feed/api/posts.api";

import PublicProfileHeader from "./PublicProfileHeader";

export default function PublicProfile() {
  const { userId } = useParams();

  const [page] = useState(1);

  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetUserQuery({ userId });

  const { data: imageData, isLoading: imageLoading } =
    useGetUserImageQuery({ userId });

  const {
    data: postsResponse,
  } = useGetFeedPostsQuery({
    userId,
    page,
    perPage: 5,
  });

  const posts = postsResponse?.data?.data || [];
  console.log(posts);
  const userPost = posts.filter((post) => post.userId === userId);
  const totalPosts = userPost.length;

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <PublicProfileHeader
            profileData={profileData}
            imageData={imageData}
            totalPosts={totalPosts}
            profileLoading={profileLoading}
            profileError={profileError}
            imageLoading={imageLoading}
          />
        </Box>
      </Container>
    </>
  );
}


