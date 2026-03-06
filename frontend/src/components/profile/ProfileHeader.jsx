import React from 'react'
import { Box, Chip, Stack, Typography, alpha } from '@mui/material'

const ProfileHeader = ({ isPrivate }) => {
  return (
    <Box
      sx={{
        px: { xs: 2.5, md: 4 },
        py: { xs: 2.2, md: 3 },
        background: theme => 
          `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 50%, ${alpha(theme.palette.background.default, 0.5)} 100%)`,
        borderBottom: '1px solid',
        borderColor: 'divider',
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
