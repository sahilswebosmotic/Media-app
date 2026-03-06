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
  const { logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) return null; // We'll handle mobile nav later

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: '100vh',
        position: 'sticky',
        top: 0,
        borderRight: `1px solid ${theme.palette.divider}`,
        px: 2,
        py: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ px: 2, mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ bgcolor: 'primary.main', width: 32, height: 32, borderRadius: 1, display: 'grid', placeItems: 'center' }}>
            <Typography variant="caption" sx={{ color: 'white', fontWeight: 900 }}>S</Typography>
          </Box>
          SocialApp
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
                  borderRadius: 8,
                  py: 1.5,
                  bgcolor: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                  color: isActive ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    bgcolor: 'rgba(56, 189, 248, 0.05)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'text.primary', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ 
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '1.1rem'
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
            borderRadius: 8,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 800,
            boxShadow: theme.shadows[4],
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
          color="error"
          sx={{
            borderRadius: 8,
            py: 1.2,
            fontSize: '0.9rem',
            fontWeight: 700,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
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
