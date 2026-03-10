import { apiSlice } from '@store/api/apiSlice'

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser : builder.query({
      query: ({ userId } = {}) => ({
        url: `/users/get-users-profile`,
        method: 'GET',
        params: userId ? { userId } : undefined,
      }),
      providesTags: ['Profile','Users'],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: '/users/get-all-user',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
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
  }),
})

export const {useGetAllUsersQuery, useGetUserImageQuery, useGetUserQuery,  useUpdateUserMutation } = usersApi
