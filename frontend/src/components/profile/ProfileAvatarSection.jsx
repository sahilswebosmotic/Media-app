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
    <Stack spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
      <Avatar src={avatarSource} alt={avatarAlt || 'User profile photo'} sx={{ width: 112, height: 112 }} />
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
          <Button variant="outlined" component="label" fullWidth>
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
