import React from 'react'
import { useToast } from '../../context/toast/useToast'
const ProfileFeedback = ({ successMessage, submitError, fileErrorMessage }) => {
  const { showError, showSuccess } = useToast();
  return (
    <>
      {successMessage && showSuccess(successMessage)}
      {submitError && showError(submitError)}
      {fileErrorMessage && showError(fileErrorMessage)}
    </>
  )
}

export default ProfileFeedback
