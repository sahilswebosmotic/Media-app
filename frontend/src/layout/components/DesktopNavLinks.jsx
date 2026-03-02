import { Box, Button } from '@mui/material'
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
            border: pathname === link.path ? '1px solid rgba(56, 189, 248, 0.45)' : '1px solid transparent',
            backgroundColor: pathname === link.path ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(148, 163, 184, 0.12)',
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
