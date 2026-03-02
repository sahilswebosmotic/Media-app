import { Link, Stack } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const FooterLinks = ({ links }) => {
  return (
    <Stack direction='row' spacing={2}>
      {links.map((link) => (
        <Link
          key={link.path}
          component={RouterLink}
          to={link.path}
          underline='none'
          color='text.secondary'
          variant='body2'
          sx={{
            px: 1,
            py: 0.4,
            borderRadius: 2,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: 'primary.light',
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
            },
          }}
        >
          {link.label}
        </Link>
      ))}
    </Stack>
  )
}

export default FooterLinks
