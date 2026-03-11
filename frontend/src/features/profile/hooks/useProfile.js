import useProfileData from './useProfileData.js'
import useProfileState from './useProfileState.js'
import useProfileForm from './useProfileForm.js'
import { useEffect, useMemo } from 'react'

const profileChannel = new BroadcastChannel('profile_updates')

export default function useProfile() {
  const {
    data,
    isLoading,
    isError,
    error,
    userImageData,
    updateUser,
    isUpdating,
  } = useProfileData()

  const {
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
  } = useProfileState()

  const currentUser = useMemo(() => data?.data ?? null, [data])

  const profileValues = useMemo(
    () => ({
      firstname: currentUser?.firstname ?? '',
      lastname: currentUser?.lastname ?? '',
      username: currentUser?.username ?? '',
      profilePhotoFile: null,
    }),
    [currentUser]
  )

  const onSubmit = async (values) => {
    resetMessages()
    const payload = new FormData()
    payload.append('firstname', values.firstname)
    payload.append('lastname', values.lastname)
    payload.append('username', values.username)

    if (values.profilePhotoFile) {
      payload.append('profilePhoto', values.profilePhotoFile)
    } else if (removeAvatar) {
      payload.append('profilePhoto', '')
    }

    try {
      await updateUser(payload).unwrap()
      clearPreview()
      setRemoveAvatar(false)
      setIsEditing(false)
      setSuccessMessage('Profile updated successfully.')
      console.log('Broadcasting profile update...')
      profileChannel.postMessage({ type: 'PROFILE_UPDATED' })
    } catch (updateError) {
      setSubmitError(updateError?.data?.message || 'Unable to update profile.')
    }
  }

  const {
    register,
    errors,
    isDirty,
    setValue,
    reset,
    watchedFile,
    avatarAlt: watchedAvatarAlt,
    displayName: watchedDisplayName,
    handleFormSubmit,
  } = useProfileForm(profileValues, onSubmit)

  const hasStoredAvatar = Boolean(userImageData?.imageData)
  const avatarSource = removeAvatar ? undefined : profilePreview || userImageData?.imageData || undefined

  const avatarAlt = isEditing
    ? watchedAvatarAlt
    : `${profileValues.firstname} ${profileValues.lastname} ${profileValues.username}`.trim()

  const displayName = isEditing
    ? watchedDisplayName
    : `${profileValues.firstname} ${profileValues.lastname} ${profileValues.username}`.trim()

  const handleEdit = () => {
    resetMessages()
    clearPreview()
    setRemoveAvatar(false)
    reset(profileValues)
    setIsEditing(true)
  }

  const handleCancel = () => {
    resetMessages()
    clearPreview()
    setRemoveAvatar(false)
    reset(profileValues)
    setIsEditing(false)
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    resetMessages()
    setRemoveAvatar(false)
    setValue('profilePhotoFile', file, { shouldDirty: true, shouldValidate: true })
    const nextPreview = URL.createObjectURL(file)
    clearPreview()
    setProfilePreview(nextPreview)
  }

  const handleRemoveAvatar = () => {
    resetMessages()
    clearPreview()
    setValue('profilePhotoFile', null, { shouldDirty: true, shouldValidate: true })
    setRemoveAvatar(true)
  }

  return {
    currentUser,
    isLoading,
    isError,
    error,
    isEditing,
    isUpdating,
    register,
    errors,
    isDirty,
    watchedFile,
    hasStoredAvatar,
    profilePreview,
    avatarSource,
    avatarAlt,
    displayName,
    profileValues,
    submitError,
    successMessage,
    handleSubmit: (fn) => (e) => handleFormSubmit(e),
    onSubmit,
    handleEdit,
    handleCancel,
    handleFileChange,
    handleRemoveAvatar,
    removeAvatar,
  }
}

