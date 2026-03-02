import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  Divider,
} from '@mui/material'
import React from 'react'
import { useAuth } from '@context/useAuth'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'

const pages = [
  { label: 'Home', path: '/home' },
  { label: 'Profile', path: '/user-profile' },
]
const settings = ['Profile', 'Logout']

const Header = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleUserAction = (action) => {
    if (action === 'Logout') {
      logout()
      navigate('/')
    }

    if (action === 'Profile') {
      navigate('/user-profile')
    }
    handleCloseUserMenu()
  }

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={24}
      sx={{
        border: 1,
        borderColor: 'white',
        borderRadius:'2.5rem',
        backdropFilter: 'blur(10px)',
        margin:'auto',
        marginTop:'2%',
        maxWidth:'80%',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="span"
            sx={{ display: { xs: 'none', md: 'flex',color:'white' }, mr: 1, fontWeight: 700 }}
          >
            SM
          </Box>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 800,
              letterSpacing: '.08rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            SOCIAL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex',  md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <Typography component="span" sx={{ fontSize: 22, color:'white', lineHeight: 1 , fontWeight:900 }}>
                |||
              </Typography>
            </IconButton>
            <Menu
              id="menu-nav-mobile"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Typography
                    component={RouterLink}
                    to={page.path}
                    sx={{ textAlign: 'center', color: 'text.primary', textDecoration: 'none' }}
                  >
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            component="span"
            sx={{ display: { xs: 'flex', md: 'none',color:'white' }, mr: 1, fontWeight: 700 }}
          >
            SM
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/home"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 800,
              letterSpacing: '.08rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            SOCIAL
          </Typography>
          <Box sx={{ flexGrow: 1, 
            display: { xs: 'none', md: 'flex' }
              }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  px: 1.6,
                  color: location.pathname === page.path ? 'primary.main' : 'text.primary',
                  display: 'block',
                  borderRadius: 2,
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  {(user?.firstname?.[0] || 'U').toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-user"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle2">
                  {user ? `${user.firstname} ${user.lastname}` : 'Guest User'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  @{user?.username || 'guest'}
                </Typography>
              </Box>
              <Divider />
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleUserAction(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
