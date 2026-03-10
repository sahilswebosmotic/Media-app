import { useState } from 'react'

export const useProfileState = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profilePreview, setProfilePreview] = useState('')
  const [removeAvatar, setRemoveAvatar] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [submitError, setSubmitError] = useState('')

  const clearPreview = () => {
    if (profilePreview) {
      URL.revokeObjectURL(profilePreview)
      setProfilePreview('')
    }
  }

  const resetMessages = () => {
    setSuccessMessage('')
    setSubmitError('')
  }

  return {
    isEditing,
    setIsEditing,
    profilePreview,
    setProfilePreview,
    removeAvatar,
    setRemoveAvatar,
    successMessage,
    setSuccessMessage,
    submitError,
    setSubmitError,
    clearPreview,
    resetMessages,
  }
}
