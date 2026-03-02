import { apiSlice } from './apiSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (payload) => ({
        url: '/sign-up',
        method: 'POST',
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: '/login',
        method: 'POST',
        body: payload,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: '/users/get-user',
        method: 'GET',
      }),
      providesTags: ['Auth', 'Profile'],
    }),
  }),
})

export const { useSignUpMutation, useLoginMutation, useGetCurrentUserQuery, useLazyGetCurrentUserQuery } =
  authApi
