import { Box, Button, alpha } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const DesktopNavLinks = ({ links, pathname }) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {links.map((link) => (
        <Button
          key={link.path}
          component={RouterLink}
          to={link.path}
          sx={{
            my: 2,
            px: 1.8,
            py: 0.9,
            color: pathname === link.path ? 'primary.main' : 'text.primary',
            display: 'block',
            borderRadius: 2,
            border: pathname === link.path 
              ? theme => `1px solid ${alpha(theme.palette.primary.main, 0.45)}` 
              : '1px solid transparent',
            backgroundColor: pathname === link.path 
              ? theme => alpha(theme.palette.primary.main, 0.12) 
              : 'transparent',
            '&:hover': {
              backgroundColor: theme => alpha(theme.palette.text.primary, 0.08),
            },
          }}
        >
          {link.label}
        </Button>
      ))}
    </Box>
  )
}

export default DesktopNavLinks
