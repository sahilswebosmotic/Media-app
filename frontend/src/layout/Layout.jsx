import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

const Layout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background:
          'radial-gradient(circle at 10% -10%, rgba(94,160,255,0.15), transparent 35%), radial-gradient(circle at 100% 10%, rgba(56,189,248,0.1), transparent 30%), #0b1220',
      }}
    >
      <Header />
      <Box component="main" sx={{ flex: 1, py: { xs: 2, md: 3 } }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
