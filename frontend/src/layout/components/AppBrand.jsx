import { Box, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const AppBrand = ({ mobile = false }) => {
  const display = mobile ? { xs: 'flex', md: 'none' } : { xs: 'none', md: 'flex' }

  return (
    <>
      <Box component='span' sx={{ display, color: 'primary.light', mr: 1, fontWeight: 800 }}>
        SM
      </Box>
      <Typography
        variant={mobile ? 'h5' : 'h6'}
        noWrap
        component={RouterLink}
        to='/home'
        sx={{
          mr: 2,
          display,
          flexGrow: mobile ? 1 : 0,
          fontWeight: 800,
          letterSpacing: '.1rem',
          color: 'text.primary',
          textDecoration: 'none',
          transition: 'opacity 0.2s ease',
          '&:hover': { opacity: 0.92 },
        }}
      >
        SOCIAL
      </Typography>
    </>
  )
}

export default AppBrand
