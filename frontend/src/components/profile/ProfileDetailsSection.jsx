import React from 'react'
import { Box, Divider, Grid, Stack, TextField, Typography, alpha } from '@mui/material'
import { formatDate } from './profileFormSchema'

const editFieldSx = {
  '& .MuiInputLabel-root': {
    color: 'text.secondary',
    fontWeight: 600,
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    backgroundColor: theme => alpha(theme.palette.background.default, 0.4),
    '& fieldset': {
      borderColor: 'divider',
    },
    '&:hover fieldset': {
      borderColor: 'primary.main',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
      borderWidth: 2,
    },
  },
}

const readonlyFieldSx = {
  '& .MuiInputLabel-root': {
    color: 'text.secondary',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
    '& fieldset': {
      borderColor: 'divider',
    },
  },
}

const ProfileDetailsSection = ({
  isEditing,
  register,
  errors,
  profileValues,
  email,
  createdAt,
  updatedAt,
}) => {
  return (
    <Stack spacing={2}>
      {isEditing ? (
        <Box
          sx={{
            p: { xs: 1.5, md: 2 },
            borderRadius: 3,
            border: '1px solid',
            borderColor: theme => alpha(theme.palette.primary.main, 0.2),
            background: theme =>
              `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.2)} 100%)`,
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1.5, color: 'text.primary' }}>
            Update Information
          </Typography>
          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                {...register('firstname')}
                error={Boolean(errors.firstname)}
                helperText={errors.firstname?.message}
                sx={editFieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                {...register('lastname')}
                error={Boolean(errors.lastname)}
                helperText={errors.lastname?.message}
                sx={editFieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                fullWidth
                {...register('username')}
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
                sx={editFieldSx}
              />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <>
          <TextField label="First Name" value={profileValues.firstname} disabled fullWidth sx={readonlyFieldSx} />
          <TextField label="Last Name" value={profileValues.lastname} disabled fullWidth sx={readonlyFieldSx} />
          <TextField label="Username" value={profileValues.username} disabled fullWidth sx={readonlyFieldSx} />
        </>
      )}

      <TextField label="Email" value={email || ''} disabled fullWidth sx={readonlyFieldSx} />

      <Divider sx={{ borderColor: 'divider' }} />

      <Grid container spacing={1.5}>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" color="text.secondary">
            Joined On
          </Typography>
          <Typography variant="body2">{formatDate(createdAt)}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" color="text.secondary">
            Last Updated
          </Typography>
          <Typography variant="body2">{formatDate(updatedAt)}</Typography>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default ProfileDetailsSection
