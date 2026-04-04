import React, { useState } from 'react'
import { Box, Divider, Grid, Stack, TextField, Typography, Button, Chip } from '@mui/material'
import { formatDate } from './profileFormSchema'
import FollowersDialog from './FollowersDialog'
import FollowingDialog from './FollowingDialog'

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
  '& .MuiInputLabel-root': {
    color: 'rgba(203, 213, 225, 0.9)',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    '& fieldset': {
      borderColor: 'rgba(148, 163, 184, 0.22)',
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
  userId,
  followersCount = 0,
  followingCount = 0,
  postsCount = 0,
}) => {
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);

  return (
    <Stack spacing={2}>
      {/* Stats Section */}
      {!isEditing && (
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.22)',
          }}
        >
          <Stack direction="row" spacing={3} justifyContent="center">
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {postsCount || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Posts
              </Typography>
            </Box>
            <Box
              sx={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => setFollowersOpen(true)}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, '&:hover': { color: 'primary.main' } }}>
                {followersCount || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Followers
              </Typography>
            </Box>
            <Box
              sx={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => setFollowingOpen(true)}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, '&:hover': { color: 'primary.main' } }}>
                {followingCount || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Following
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

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

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

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

      <FollowersDialog
        open={followersOpen}
        onClose={() => setFollowersOpen(false)}
        userId={userId}
      />
      <FollowingDialog
        open={followingOpen}
        onClose={() => setFollowingOpen(false)}
        userId={userId}
      />
    </Stack>
  )
}

export default ProfileDetailsSection
