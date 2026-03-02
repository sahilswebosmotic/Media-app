import { apiSlice } from './apiSlice'

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getUserImage: builder.query({
    //   query: ({ userId } = {}) => ({
    //     url: '/users/get-user-image',
    //     method: 'GET',
    //     params: userId,
    //   }),
    //   providesTags: ['Profile'],
    // }),
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

export const {  useUpdateUserMutation } = usersApi
