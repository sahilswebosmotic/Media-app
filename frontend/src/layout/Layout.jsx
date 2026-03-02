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
          'radial-gradient(circle at 8% -8%, rgba(56, 189, 248, 0.16), transparent 30%), radial-gradient(circle at 92% 12%, rgba(99, 102, 241, 0.18), transparent 33%), #050a16',
      }}
    >
      <Header />
      <Box component='main' sx={{ flex: 1, py: { xs: 2.5, md: 3.5 } }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
