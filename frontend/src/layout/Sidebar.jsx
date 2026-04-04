import React from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Button, 
  Typography, 
  useTheme,
  Stack,
  useMediaQuery
} from '@mui/material';
import { 
  Home as HomeIcon, 
  Explore as ExploreIcon, 
  Notifications as NotificationsIcon, 
  Mail as MailIcon, 
  Bookmark as BookmarkIcon, 
  Person as PersonIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';

const SIDEBAR_WIDTH = 280;

const NAV_ITEMS = [
  { label: 'Home', icon: <HomeIcon />, path: '/home' },
  { label: 'Explore', icon: <ExploreIcon />, path: '/discover' },
  { label: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
  { label: 'Messages', icon: <MailIcon />, path: '/messages' },
  { label: 'Bookmarks', icon: <BookmarkIcon />, path: '/bookmarks' },
  { label: 'Profile', icon: <PersonIcon />, path: '/user-profile' },
];

const Sidebar = ({ onCreatePost, onLogout }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) return null; // We'll handle mobile nav later

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: '100vh',
        position: 'sticky',
        top: 0,
        px: 2.5,
        py: 3.5,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ px: 1.5, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '10px',
              display: 'grid',
              placeItems: 'center',
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              color: '#ffffff',
              fontWeight: 900,
              fontSize: 14,
            }}
          >
            M
          </Box>
          MediaApp
        </Typography>
      </Box>

      <List sx={{ flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 999,
                  py: 1.2,
                  px: 1.6,
                  bgcolor: isActive ? (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)') : 'transparent',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,20,25,0.06)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'text.primary', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ 
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '1.02rem'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Stack spacing={1} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<AddIcon />}
          onClick={onCreatePost}
          sx={{
            borderRadius: '8px',
            py: 1.3,
            fontSize: '14px',
            fontWeight: 600,
            boxShadow: 'none',
            textTransform: 'none',
          }}
        >
          Create Post
        </Button>
        <Button
          variant="outlined"
          fullWidth
          size="large"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          sx={{
            borderRadius: '8px',
            py: 1.2,
            fontSize: '14px',
            fontWeight: 600,
            borderColor: theme.palette.mode === 'dark' ? '#363636' : '#dbdbdb',
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
            textTransform: 'none',
            '&:hover': {
              borderColor: theme.palette.mode === 'dark' ? '#363636' : '#dbdbdb',
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            }
          }}
        >
          Logout
        </Button>
      </Stack>
    </Box>
  );
};

export default Sidebar;
