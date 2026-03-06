import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  InputBase, 
  IconButton, 
  Avatar, 
  useTheme,
  alpha,
  Switch,
  Stack,
  Tooltip,
  styled,
  Typography  
} from '@mui/material';
import { 
  Search as SearchIcon, 
  NotificationsNone as NotificationsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon
} from '@mui/icons-material';
import { useThemeContext } from '../context/theme/ThemeContext';
import { useAuth } from '../context/auth/useAuth';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.common.white, 0.05) 
    : alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? alpha(theme.palette.common.white, 0.1) 
      : alpha(theme.palette.common.black, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: 400,
  transition: 'all 0.3s ease',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1.2, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '0.95rem',
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const { user } = useAuth();

  return (
    <AppBar 
      position="sticky" 
      color="inherit" 
      elevation={0} 
      sx={{ 
        bgcolor: 'background.default',
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, lg: 4 } }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: { xs: 1, sm: 0 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 900, 
              color: 'primary.main', 
              display: { xs: 'flex', sm: 'none' }, 
              alignItems: 'center', 
              gap: 1 
            }}
          >
            <Box sx={{ bgcolor: 'primary.main', width: 28, height: 28, borderRadius: 1, display: 'grid', placeItems: 'center' }}>
              <Typography variant="caption" sx={{ color: 'white', fontWeight: 900 }}>S</Typography>
            </Box>
          </Typography>

          <Search sx={{ display: { xs: 'none', md: 'block' } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search SocialApp..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Stack>

        <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
          <Search sx={{ 
            display: { xs: 'flex', md: 'none' }, 
            maxWidth: { xs: 120, sm: 300 },
            '& .MuiInputBase-input': { 
              px: { xs: 1, sm: 2 },
              fontSize: { xs: '0.8rem', sm: '0.9rem' } 
            }
          }}>
            <SearchIconWrapper sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <SearchIcon fontSize="small" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              sx={{ pl: { xs: 1, sm: 0 } }}
            />
          </Search>

          <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton onClick={toggleTheme} color="inherit" size="small">
              {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          
          <IconButton color="inherit" size="small" sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <NotificationsIcon fontSize="small" />
          </IconButton>

          <Avatar 
            src={user?.profilePhoto} 
            sx={{ 
              width: { xs: 32, sm: 40 }, 
              height: { xs: 32, sm: 40 }, 
              border: `2px solid ${theme.palette.primary.main}`,
              cursor: 'pointer'
            }} 
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
