import React from 'react'
import { Alert } from '@mui/material'

const ProfileFeedback = ({ successMessage, submitError, fileErrorMessage }) => {
  return (
    <>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {submitError && <Alert severity="error">{submitError}</Alert>}
      {fileErrorMessage && <Alert severity="error">{fileErrorMessage}</Alert>}
    </>
  )
}

export default ProfileFeedback
