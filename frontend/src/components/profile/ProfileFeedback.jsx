import { useEffect } from 'react'
import { useToast } from '../../context/toast/useToast'

const ProfileFeedback = ({ successMessage, submitError, fileErrorMessage }) => {
  const { showError, showSuccess } = useToast()

  useEffect(() => {
    if (successMessage) showSuccess(successMessage)
  }, [successMessage])

  useEffect(() => {
    if (submitError) showError(submitError)
  }, [submitError])

  useEffect(() => {
    if (fileErrorMessage) showError(fileErrorMessage)
  }, [fileErrorMessage])

  return null  // ✅ renders nothing, toasts are the UI
}

export default ProfileFeedback