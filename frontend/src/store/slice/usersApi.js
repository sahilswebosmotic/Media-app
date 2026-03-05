import { apiSlice } from './apiSlice'

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserImage: builder.query({
      query: ({ userId } = {}) => ({
        url: `/users/get-user-image`,
        method: 'GET',
        params: userId ? { userId } : undefined,
      }),
      providesTags: ['Profile'],
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: '/users/update-user',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Auth', 'Profile'],
    }),
    getUsersProfile: builder.query({
      query: (userId) => ({
        url: '/users/get-users-profile',
        method: 'GET',
        params: { userId },
      }),
    }),
    getAllUsers: builder.query({
      query: ({ page = 1, perPage = 10, search = '' } = {}) => ({
        url: '/users/get-all-user',
        method: 'GET',
        params: { page, perPage, searchText: search },
      }),
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: '/users/delete-user',
        method: 'DELETE',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const {
  useGetUserImageQuery,
  useUpdateUserMutation,
  useGetUsersProfileQuery,
  useGetAllUsersQuery,
  useDeleteAccountMutation,
} = usersApi
