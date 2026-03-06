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
        bgcolor: 'transparent',
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
