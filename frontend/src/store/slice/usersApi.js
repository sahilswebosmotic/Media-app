import { apiSlice } from './apiSlice'

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page = 1, perPage = 12, search } = {}) => ({
        url: '/users/get-all-user',
        method: 'GET',
        params: {
          page,
          perPage,
          ...(search ? { search } : {}),
        },
      }),
      providesTags: ['Profile', 'Follows'],
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

    // Follow endpoints
    followUser: builder.mutation({
      query: (userId) => ({
        url: '/users/follow',
        method: 'POST',
        body: { userId },
      }),
      invalidatesTags: ['Follows', 'Profile'],
    }),
    getFollowers: builder.query({
      query: ({ userId, page = 1, perPage = 20 }) => ({
        url: `/users/${userId}/followers`,
        method: 'GET',
        params: { page, perPage },
      }),
      providesTags: (result, error, { userId }) => [
        { type: 'Follows', id: `followers-${userId}` },
      ],
    }),
    getFollowing: builder.query({
      query: ({ userId, page = 1, perPage = 20 }) => ({
        url: `/users/${userId}/following`,
        method: 'GET',
        params: { page, perPage },
      }),
      providesTags: (result, error, { userId }) => [
        { type: 'Follows', id: `following-${userId}` },
      ],
    }),
    isFollowing: builder.query({
      query: (userId) => ({
        url: `/users/${userId}/is-following`,
        method: 'GET',
      }),
      providesTags: (result, error, userId) => [
        { type: 'Follows', id: userId },
      ],
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useGetUserImageQuery,
  useUpdateUserMutation,
  useFollowUserMutation,
  useGetFollowersQuery,
  useLazyGetFollowersQuery,
  useGetFollowingQuery,
  useLazyGetFollowingQuery,
  useIsFollowingQuery,
  useLazyIsFollowingQuery,
} = usersApi
