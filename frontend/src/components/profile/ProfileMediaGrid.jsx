import React from 'react';
import { Box, ImageList, ImageListItem, Typography, useTheme, CircularProgress } from '@mui/material';
import { useGetUsersPostsQuery } from '../../store/slice/postsApi';
import FeedImage from '../feed/FeedImage';

const ProfileMediaGrid = ({ userId }) => {
  const theme = useTheme();
  const { data, isLoading, isError } = useGetUsersPostsQuery({ userId });
  const posts = data?.data?.data || [];

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  if (isError) return <Typography color="error" sx={{ p: 4 }}>Failed to load posts.</Typography>;
  if (posts.length === 0) return <Typography sx={{ p: 4, textAlign: 'center' }} color="text.secondary">No posts yet.</Typography>;

  return (
    <ImageList variant="quilted" cols={3} gap={4}>
      {posts.map((post) => (
        <ImageListItem 
          key={post._id} 
          sx={{ 
            aspectRatio: '1 / 1', 
            overflow: 'hidden', 
            borderRadius: 1,
            cursor: 'pointer',
            '&:hover': { opacity: 0.9 }
          }}
        >
          <FeedImage postId={post._id} title={post.title} hasImage={true} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ProfileMediaGrid;
