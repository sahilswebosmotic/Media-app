import { Box, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const AppBrand = ({ mobile = false }) => {
  const display = mobile ? { xs: 'flex', md: 'none' } : { xs: 'none', md: 'flex' }

  return (
    <>
      <Box component='span' sx={{ display, color: 'primary.main', mr: 1, fontWeight: 900, fontSize: '1.2rem' }}>
        <Box sx={{ width: 12, height: 12, bgcolor: 'primary.main', borderRadius: '50%', display: 'inline-block', mb: 0.5 }} />
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
          fontWeight: 900,
          letterSpacing: '.15rem',
          color: 'text.primary',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          textShadow: theme => theme.palette.mode === 'light' ? '0 2px 4px rgba(0,0,0,0.02)' : '0 2px 10px rgba(0,0,0,0.2)',
          '&:hover': { 
            color: 'primary.main',
            transform: 'scale(1.02)'
          },
        }}
      >
        SOCIAL
      </Typography>
    </>
  )
}

export default AppBrand
