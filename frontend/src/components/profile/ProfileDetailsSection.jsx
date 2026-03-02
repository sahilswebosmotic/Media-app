import React from 'react'
import { Box, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import { formatDate } from './profileFormSchema'

const editFieldSx = {
  '& .MuiInputLabel-root': {
    color: 'rgba(226, 232, 240, 0.92)',
    fontWeight: 600,
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    '& fieldset': {
      borderColor: 'rgba(148, 163, 184, 0.35)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(56, 189, 248, 0.75)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#38bdf8',
      borderWidth: 2,
    },
  },
}

const readonlyFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    backgroundColor: 'rgba(148, 163, 184, 0.08)',
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
            border: '1px solid rgba(56, 189, 248, 0.22)',
            background:
              'linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, rgba(15, 23, 42, 0.25) 100%)',
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1.5, color: 'rgba(203, 213, 225, 0.95)' }}>
            Update Information
          </Typography>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="First Name"
                fullWidth
                {...register('firstname')}
                error={Boolean(errors.firstname)}
                helperText={errors.firstname?.message}
                sx={editFieldSx}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Last Name"
                fullWidth
                {...register('lastname')}
                error={Boolean(errors.lastname)}
                helperText={errors.lastname?.message}
                sx={editFieldSx}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
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

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="caption" color="text.secondary">
            Joined On
          </Typography>
          <Typography variant="body2">{formatDate(createdAt)}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
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
