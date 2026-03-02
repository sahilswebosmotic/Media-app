import React from 'react'
import { Box, Chip, Stack, Typography } from '@mui/material'

const ProfileHeader = ({ isPrivate }) => {
  return (
    <Box
      sx={{
        px: { xs: 2.5, md: 4 },
        py: { xs: 2.2, md: 3 },
        background:
          'linear-gradient(90deg, rgba(56,189,248,0.22) 0%, rgba(59,130,246,0.18) 50%, rgba(14,23,43,0.4) 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
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
