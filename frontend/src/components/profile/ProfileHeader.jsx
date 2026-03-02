import React from 'react'
import { Box, Chip, Stack, Typography } from '@mui/material'

const ProfileHeader = ({ isPrivate }) => {
  return (
    <Box
      sx={{
        px: { xs: 2.5, md: 4 },
        py: { xs: 2.2, md: 3 },
        background:
          'linear-gradient(90deg, rgba(56, 189, 248, 0.2) 0%, rgba(99, 102, 241, 0.18) 50%, rgba(2, 6, 23, 0.34) 100%)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
      }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '0.01em' }}>
          Profile Settings
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip
            label={isPrivate ? 'Private Account' : 'Public Account'}
            color={isPrivate ? 'warning' : 'success'}
            size="small"
          />
          <Chip label="Verified" color="info" size="small" />
        </Stack>
      </Stack>
    </Box>
  )
}

export default ProfileHeader
