import { useEffect } from 'react'
import { useToast } from '@context/toast/useToast'

export default function ProfileFeedback({ successMessage, submitError, fileErrorMessage }) {
  const { showError, showSuccess } = useToast()

  useEffect(() => {
    if (successMessage) showSuccess(successMessage)
  }, [successMessage, showSuccess])

  useEffect(() => {
    if (submitError) showError(submitError)
  }, [submitError, showError])

  useEffect(() => {
    if (fileErrorMessage) showError(fileErrorMessage)
  }, [fileErrorMessage, showError])

  return null  
}
