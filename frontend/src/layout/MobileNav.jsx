import React from 'react';
import { 
  Paper, 
  BottomNavigation, 
  BottomNavigationAction, 
  useTheme,
  Box,
  Fab,
  styled
} from '@mui/material';
import { 
  Home as HomeIcon, 
  Explore as ExploreIcon, 
  Notifications as NotificationsIcon, 
  Person as PersonIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const MobileNav = ({ onCreatePost }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: theme.zIndex.appBar,
        display: { xs: 'block', sm: 'none' },
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
        pb: 'env(safe-area-inset-bottom)'
      }} 
      elevation={3}
    >
      <Box sx={{ position: 'relative' }}>
        <StyledFab 
          color="primary" 
          aria-label="add" 
          onClick={onCreatePost}
          size="medium"
        >
          <AddIcon />
        </StyledFab>
        <BottomNavigation
          showLabels={false}
          value={location.pathname}
          onChange={handleChange}
          sx={{ height: 60, bgcolor: 'transparent' }}
        >
          <BottomNavigationAction
            label="Home"
            value="/home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Explore"
            value="/discover"
            icon={<ExploreIcon />}
          />
          {/* Spacer for FAB */}
          <Box sx={{ width: 60 }} /> 
          <BottomNavigationAction
            label="Notifications"
            value="/notifications"
            icon={<NotificationsIcon />}
          />
          <BottomNavigationAction
            label="Profile"
            value="/user-profile"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </Box>
    </Paper>
  );
};

export default MobileNav;
