import { Box, Container, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: { xs: 2.5, sm: 3 },
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'rgba(18, 26, 43, 0.75)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
        >
          <Typography variant="body2" color="text.secondary">
            Social Media Platform
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link
              component={RouterLink}
              to="/home"
              underline="hover"
              color="text.secondary"
              variant="body2"
            >
              Home
            </Link>
            <Link
              component={RouterLink}
              to="/user-profile"
              underline="hover"
              color="text.secondary"
              variant="body2"
            >
              Profile
            </Link>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            (c) {year} All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
