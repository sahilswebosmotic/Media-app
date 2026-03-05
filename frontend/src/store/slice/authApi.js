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
    resendVerification: builder.mutation({
      query: (payload) => ({
        url: '/resend-verification',
        method: 'POST',
        body: payload,
      }),
    }),
    verifyAccount: builder.query({
      query: (token) => ({
        url: `/verify-account`,
        method: 'GET',
        params: { token },
      }),
    }),
  }),
})

export const {
  useSignUpMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useResendVerificationMutation,
  useVerifyAccountQuery,
} = authApi
