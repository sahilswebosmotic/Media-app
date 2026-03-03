import {
  AppBar,
  Container,
  Toolbar,
} from '@mui/material'
import { useState } from 'react'
import { useAuth } from '@context/auth/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import AppBrand from './components/AppBrand'
import MobileNavMenu from './components/MobileNavMenu'
import DesktopNavLinks from './components/DesktopNavLinks'
import UserMenu from './components/UserMenu'
import { NAV_LINKS, USER_MENU_ACTIONS } from './navConfig'

const Header = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

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
      position='sticky'
      color='transparent'
      elevation={0}
      sx={{
        border: 1,
        borderColor: 'rgba(148, 163, 184, 0.22)',
        borderRadius: '1rem',
        backdropFilter: 'blur(14px)',
        bgcolor: 'rgba(15, 23, 42, 0.62)',
        margin: 'auto',
        marginTop: { xs: 1.5, md: 2 },
        maxWidth: { xs: '94%', md: '86%' },
        boxShadow: '0 18px 40px rgba(2, 6, 23, 0.35)',
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ minHeight: { xs: 62, md: 68 } }}>
          <AppBrand />

          <MobileNavMenu
            links={NAV_LINKS}
            anchorEl={anchorElNav}
            onOpen={handleOpenNavMenu}
            onClose={handleCloseNavMenu}
          />
          <AppBrand mobile />
          <DesktopNavLinks links={NAV_LINKS} pathname={location.pathname} />
          <UserMenu
            user={user}
            actions={USER_MENU_ACTIONS}
            anchorEl={anchorElUser}
            onOpen={handleOpenUserMenu}
            onClose={handleCloseUserMenu}
            onAction={handleUserAction}
          />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
