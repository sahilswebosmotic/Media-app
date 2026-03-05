import { useMemo, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useWatch } from 'react-hook-form'
import { useGetCurrentUserQuery } from '@store/slice/authApi'
import { useGetUserImageQuery, useUpdateUserMutation, useDeleteAccountMutation } from '@store/slice/usersApi'
import { useAuth } from '@context/auth/useAuth'
import { defaultValues, profileSchema } from './profileFormSchema'

const useUserProfilePage = () => {
  const { data, isLoading, isError, error } = useGetCurrentUserQuery()
  const { data: userImageData } = useGetUserImageQuery()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation()
  const { logout } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const [profilePreview, setProfilePreview] = useState('')
  const [removeAvatar, setRemoveAvatar] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const currentUser = useMemo(() => data?.data ?? null, [data])
  // const currentUser = data?.data ?? null
  const profileValues = useMemo(
    () => ({
      firstname: currentUser?.firstname ?? '',
      lastname: currentUser?.lastname ?? '',
      username: currentUser?.username ?? '',
      profilePhotoFile: currentUser?.profilePhotoFile || null,
    }),
    [currentUser]
  )

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues,
    resolver: yupResolver(profileSchema),
  })

  const watchedFirstname = useWatch({ control, name: 'firstname' })
  const watchedLastname = useWatch({ control, name: 'lastname' })
  const watchedFile = useWatch({ control, name: 'profilePhotoFile' })
  const watchedUserName = useWatch({ control, name: 'username' })

  const hasStoredAvatar = Boolean(userImageData?.imageData)
  const avatarSource = removeAvatar ? undefined : profilePreview || userImageData?.imageData || undefined

  const avatarAlt = isEditing
    ? `${watchedFirstname || ''} ${watchedLastname || ''} ${watchedUserName || ''}`.trim()
    : `${profileValues.firstname} ${profileValues.lastname} ${profileValues.username}`.trim()

  const displayName = `${isEditing ? watchedFirstname || '' : profileValues.firstname} 
                        ${isEditing ? watchedLastname || '' : profileValues.lastname}
                        ${isEditing ? watchedUserName || '' : profileValues.username}`.trim()

  const clearPreview = () => {
    if (profilePreview) {
      URL.revokeObjectURL(profilePreview)
      setProfilePreview('')
    }
  }

  const handleEdit = () => {
    setSuccessMessage('')
    setSubmitError('')
    clearPreview()
    setRemoveAvatar(false)
    reset(profileValues)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setSuccessMessage('')
    setSubmitError('')
    clearPreview()
    setRemoveAvatar(false)
    reset(profileValues)
    setIsEditing(false)
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    setSuccessMessage('')
    setSubmitError('')
    setRemoveAvatar(false)
    setValue('profilePhotoFile', file, { shouldDirty: true, shouldValidate: true })
    const nextPreview = URL.createObjectURL(file)
    clearPreview()
    setProfilePreview(nextPreview)
  }

  const handleRemoveAvatar = () => {
    setSuccessMessage('')
    setSubmitError('')
    clearPreview()
    setValue('profilePhotoFile', null, { shouldDirty: true, shouldValidate: true })
    setRemoveAvatar(true)
  }

  const onAccountDelete = async () => {
    try {
      await deleteAccount().unwrap()
      logout()
    } catch (err) {
      setSubmitError(err?.data?.message || 'Failed to delete account.')
    }
  }

  const onSubmit = async (values) => {
    setSuccessMessage('')
    setSubmitError('')
    // console.log(values);
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
    } catch (updateError) {
      setSubmitError(updateError?.data?.message || 'Unable to update profile.')
    }
  }

  return {
    currentUser,
    isLoading,
    isError,
    error,
    isEditing,
    isUpdating,
    isDeleting,
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
    handleSubmit,
    onSubmit,
    handleEdit,
    handleCancel,
    handleFileChange,
    handleRemoveAvatar,
    removeAvatar,
    onAccountDelete,
  }
}

export default useUserProfilePage
