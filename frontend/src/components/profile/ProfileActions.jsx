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
      <Button type="button" variant="contained" onClick={onEdit} sx={{ alignSelf: 'flex-start' }}>
        Edit Profile
      </Button>
    )
  }

  return (
    <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
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
