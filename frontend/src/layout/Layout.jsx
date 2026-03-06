import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Container, Stack, useTheme, useMediaQuery } from '@mui/material'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Widgets from './Widgets'
import MobileNav from './MobileNav'
import CreatePostDialog from '../components/feed/CreatePostDialog/CreatePostDialog'
import LogoutConfirmationDialog from '../components/common/LogoutConfirmationDialog'
import { useAuth } from '../context/auth/useAuth'

const Layout = () => {
  const theme = useTheme();
  const { logout } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = React.useState(false);
  const [initialPostText, setInitialPostText] = React.useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        transition: 'background-color 0.3s ease',
        pb: isMobile ? 8 : 0 // Add padding for bottom nav
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Stack direction="row" sx={{ minHeight: '100vh' }}>
          {/* Left Column: Sidebar */}
          {!isMobile && (
            <Box sx={{ 
              width: { sm: 80, lg: 280 }, 
              flexShrink: 0,
              display: { xs: 'none', sm: 'block' }
            }}>
              <Sidebar 
                onCreatePost={() => setIsCreateOpen(true)} 
                onLogout={() => setIsLogoutConfirmOpen(true)}
              />
            </Box>
          )}

          {/* Center Column: Main Content */}
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              borderRight: `1px solid ${theme.palette.divider}`,
              minWidth: 0,
              width: '100%'
            }}
          >
            <Navbar />
            <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
              <Outlet context={{ setIsCreateOpen, setInitialPostText, setIsLogoutConfirmOpen }} />
            </Box>
          </Box>

          {/* Right Column: Widgets */}
          {!isTablet && (
            <Box sx={{ 
              width: 350, 
              flexShrink: 0,
              display: { xs: 'none', md: 'block' }
            }}>
              <Widgets />
            </Box>
          )}
        </Stack>
      </Container>

      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileNav onCreatePost={() => setIsCreateOpen(true)} />}

      {/* Global Create Post Dialog */}
      <CreatePostDialog
        open={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setInitialPostText('');
        }}
        initialText={initialPostText}
      />

      {/* Global Logout Confirmation */}
      <LogoutConfirmationDialog
        open={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirm={() => {
          setIsLogoutConfirmOpen(false);
          logout();
        }}
      />
    </Box>
  )
}

export default Layout
