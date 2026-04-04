import React from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, Button, Avatar, Stack, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FollowButton from '@components/common/FollowButton';
import { useGetAllUsersQuery } from '@store/slice/usersApi';
import { useAuth } from '@context/auth/useAuth';

const TrendingWidget = () => {
  const theme = useTheme();
  const trends = [
    { category: 'Technology · Trending', title: '#InfiniteScroll', posts: '12.5K Posts' },
    { category: 'Web Development · Trending', title: 'Tailwind CSS', posts: '45.2K Posts' },
    { category: 'Programming · Trending', title: 'Backend Architecture', posts: '8,230 Posts' },
  ];

  return (
    <Card sx={{ mb: 2, bgcolor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Trending</Typography>
        <List disablePadding>
          {trends.map((trend, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="caption" color="text.secondary">{trend.category}</Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>{trend.title}</Typography>
              <Typography variant="caption" color="text.secondary">{trend.posts}</Typography>
            </ListItem>
          ))}
        </List>
        <Button fullWidth color="primary" sx={{ mt: 1, fontWeight: 700 }}>Show more</Button>
      </CardContent>
    </Card>
  );
};

const FollowWidget = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const { data, isLoading } = useGetAllUsersQuery({ page: 1, perPage: 5 });
  const users = (data?.data || []).filter((item) => item?._id !== currentUser?._id).slice(0, 2);

  const initials = (user) =>
    `${user?.firstname?.[0] || ''}${user?.lastname?.[0] || ''}`.trim() ||
    user?.username?.[0]?.toUpperCase() ||
    'U';

  return (
    <Card sx={{ bgcolor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Who to follow</Typography>
        <Stack spacing={2}>
          {!isLoading && users.map((item) => (
            <Stack key={item._id} direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.light' }}>{initials(item)}</Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {item.firstname} {item.lastname}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    @{item.username}
                  </Typography>
                </Box>
              </Stack>
              <FollowButton userId={item._id} size="small" />
            </Stack>
          ))}
        </Stack>
        <Button
          fullWidth
          color="primary"
          sx={{ mt: 2, fontWeight: 700 }}
          onClick={() => navigate('/discover')}
        >
          Show more
        </Button>
      </CardContent>
    </Card>
  );
};

const Widgets = () => {
  return (
    <Box sx={{ py: 3, px: 2.5, height: '100vh', position: 'sticky', top: 0, overflowY: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
      <TrendingWidget />
      <FollowWidget />
      
      <Box sx={{ mt: 4, px: 2 }}>
        <Typography variant="caption" color="text.secondary" component="div" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Cookie Policy</span>
          <span>Accessibility</span>
          <span>© 2026 MediaApp, Inc.</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default Widgets;
