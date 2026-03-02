import React from 'react'
import { Button, Stack } from '@mui/material'

const ProfileActions = ({
  isEditing,
  isUpdating,
  isDirty,
  removeAvatar,
  onEdit,
  onCancel,
}) => {
  if (!isEditing) {
    return (
      <Button type="button" variant="contained" onClick={onEdit}>
        Edit Profile
      </Button>
    )
  }

  return (
    <Stack direction="row" spacing={1.2}>
      <Button type="submit" variant="contained" disabled={isUpdating || (!isDirty && !removeAvatar)}>
        {isUpdating ? 'Saving...' : 'Save Changes'}
      </Button>
      <Button type="button" variant="outlined" onClick={onCancel} disabled={isUpdating}>
        Cancel
      </Button>
    </Stack>
  )
}

export default ProfileActions
