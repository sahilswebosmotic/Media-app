import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import FooterLinks from './components/FooterLinks'
import { NAV_LINKS } from './navConfig'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <Box
      component='footer'
      sx={{
        mt: 4,
        py: { xs: 2.5, sm: 3 },
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.74)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth='xl'>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.8}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent='space-between'
        >
          <Typography variant='body2' color='text.secondary'>
            Social Media Platform
          </Typography>

          <FooterLinks links={NAV_LINKS} />

          <Typography variant='body2' color='text.secondary'>
            (c) {year} All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
