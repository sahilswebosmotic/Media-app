import React from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Button, Avatar, Stack, useTheme } from '@mui/material';

const TrendingWidget = () => {
  const theme = useTheme();
  const trends = [
    { category: 'Technology · Trending', title: '#InfiniteScroll', posts: '12.5K Posts' },
    { category: 'Web Development · Trending', title: 'Tailwind CSS', posts: '45.2K Posts' },
    { category: 'Programming · Trending', title: 'Backend Architecture', posts: '8,230 Posts' },
  ];

  return (
    <Card sx={{ mb: 3, bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : '#fff' }}>
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
  return (
    <Card sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : '#fff' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Who to follow</Typography>
        <Stack spacing={2}>
          {[1, 2].map((i) => (
            <Stack key={i} direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.light' }}>{i === 1 ? 'MF' : 'LW'}</Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {i === 1 ? 'Michael Foster' : 'Lindsay Walton'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {i === 1 ? '@michael_foster' : '@lindsay_walton'}
                  </Typography>
                </Box>
              </Stack>
              <Button size="small" variant="contained" sx={{ borderRadius: 20, px: 2, bgcolor: theme.palette.mode === 'dark' ? 'white' : 'black', color: theme.palette.mode === 'dark' ? 'black' : 'white', '&:hover': { bgcolor: theme.palette.mode === 'dark' ? '#eee' : '#333' } }}>
                Follow
              </Button>
            </Stack>
          ))}
        </Stack>
        <Button fullWidth color="primary" sx={{ mt: 2, fontWeight: 700 }}>Show more</Button>
      </CardContent>
    </Card>
  );
};

const Widgets = () => {
  return (
    <Box sx={{ py: 3, px: 2, height: '100vh', position: 'sticky', top: 0, overflowY: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
      <TrendingWidget />
      <FollowWidget />
      
      <Box sx={{ mt: 4, px: 2 }}>
        <Typography variant="caption" color="text.secondary" component="div" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Cookie Policy</span>
          <span>Accessibility</span>
          <span>© 2026 SocialApp, Inc.</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default Widgets;
