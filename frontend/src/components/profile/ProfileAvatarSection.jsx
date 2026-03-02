import React from 'react'
import { Avatar, Button, Stack, Typography } from '@mui/material'

const ProfileAvatarSection = ({
  avatarSource,
  avatarAlt,
  isEditing,
  watchedFile,
  displayName,
  username,
  hasStoredAvatar,
  profilePreview,
  onFileChange,
  onRemoveAvatar,
}) => {
  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-start', md: 'center' }}
      sx={{
        p: { xs: 1.5, md: 2 },
        borderRadius: 3,
        border: '1px solid rgba(148, 163, 184, 0.18)',
        backgroundColor: 'rgba(15, 23, 42, 0.42)',
      }}
    >
      <Avatar
        src={avatarSource}
        alt={avatarAlt || 'User profile photo'}
        sx={{ width: 112, height: 112, border: '2px solid rgba(56, 189, 248, 0.4)' }}
      />
      <Stack spacing={1} sx={{ width: '100%' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {displayName || 'User'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          @{username}
        </Typography>
        {isEditing && watchedFile?.name && (
          <Typography variant="caption" color="text.secondary">
            Selected file: {watchedFile.name}
          </Typography>
        )}
      </Stack>

      {isEditing && (
        <Stack spacing={1.2} sx={{ width: '100%' }}>
          <Button variant="outlined" component="label" fullWidth sx={{ borderRadius: 2.5 }}>
            {watchedFile ? 'Change Avatar' : 'Upload Avatar'}
            <input hidden accept="image/*" type="file" onChange={onFileChange} />
          </Button>
          {(hasStoredAvatar || profilePreview) && (
            <Button variant="text" color="error" onClick={onRemoveAvatar}>
              Remove Avatar
            </Button>
          )}
        </Stack>
      )}
    </Stack>
  )
}

export default ProfileAvatarSection
