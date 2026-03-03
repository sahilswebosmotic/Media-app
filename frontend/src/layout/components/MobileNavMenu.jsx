import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const MobileNavMenu = ({ links, anchorEl, onOpen, onClose }) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size='large'
        aria-label='open navigation menu'
        aria-controls='menu-nav-mobile'
        aria-haspopup='true'
        onClick={onOpen}
        color='inherit'
        sx={{
          border: '1px solid rgba(148, 163, 184, 0.25)',
          borderRadius: 2.5,
          px: 1.1,
        }}
      >
        <Typography component='span' sx={{ fontSize: 12, color: 'text.primary', lineHeight: 1, fontWeight: 800 }}>
          Menu
        </Typography>
      </IconButton>
      <Menu
        id='menu-nav-mobile'
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorEl)}
        onClose={onClose}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {links.map((link) => (
          <MenuItem key={link.path} onClick={onClose} sx={{ minWidth: 150 }}>
            <Typography component={RouterLink} to={link.path} sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {link.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default MobileNavMenu
