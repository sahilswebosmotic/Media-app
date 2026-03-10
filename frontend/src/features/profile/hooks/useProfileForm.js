import { useMemo } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useWatch } from 'react-hook-form'
import { defaultValues, profileSchema } from '../validation/profile.schema'

export const useProfileForm = (profileValues, onSubmitHandler) => {
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

  const avatarAlt = useMemo(() => {
    return `${watchedFirstname || ''} ${watchedLastname || ''} ${watchedUserName || ''}`.trim()
  }, [watchedFirstname, watchedLastname, watchedUserName])

  const displayName = useMemo(() => {
    return `${watchedFirstname || ''} ${watchedLastname || ''} ${watchedUserName || ''}`.trim()
  }, [watchedFirstname, watchedLastname, watchedUserName])

  const handleFormSubmit = handleSubmit(onSubmitHandler)

  return {
    register,
    errors,
    isDirty,
    setValue,
    reset,
    watchedFile,
    avatarAlt,
    displayName,
    handleFormSubmit,
  }
}
