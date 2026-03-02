import React from 'react'
import { Alert } from '@mui/material'

const ProfileFeedback = ({ successMessage, submitError, fileErrorMessage }) => {
  return (
    <>
      {successMessage && <Alert severity="success" variant="filled">{successMessage}</Alert>}
      {submitError && <Alert severity="error" variant="filled">{submitError}</Alert>}
      {fileErrorMessage && <Alert severity="error" variant="filled">{fileErrorMessage}</Alert>}
    </>
  )
}

export default ProfileFeedback
