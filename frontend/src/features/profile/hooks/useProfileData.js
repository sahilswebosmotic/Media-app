import { useGetCurrentUserQuery } from '@features/auth/api/auth.api'
import { useGetUserImageQuery, useUpdateUserMutation } from '@features/profile/api/users.api'

export default function useProfileData() {
  const { data, isLoading, isError, error } = useGetCurrentUserQuery()
  const { data: userImageData } = useGetUserImageQuery()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  return {
    data,
    isLoading,
    isError,
    error,
    userImageData,
    updateUser,
    isUpdating,
  }
}
