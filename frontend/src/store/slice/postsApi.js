import { apiSlice } from './apiSlice'

export const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedPosts: builder.query({
      query: ({ page = 1, perPage = 20, search = '', isMyPostsOnly = false } = {}) => ({
        url: '/posts/get-feed-posts',
        method: 'GET',
        params: { page, perPage, search, isMyPostsOnly },
      }),
      providesTags: ['Posts'],
    }),
    getFeedImage: builder.query({
      query: ({ postId }) => ({
        url: '/posts/get-feed-image',
        method: 'GET',
        params: { postId },
      }),
    }),
    createPost: builder.mutation({
      query: (formData) => ({
        url: '/posts/create-post',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Posts'],
    }),
    getUserPosts: builder.query({
      query: ({ userId, page = 1, perPage = 20 } = {}) => ({
        url: '/posts/get-user-posts',
        method: 'GET',
        params: { userId, page, perPage },
      }),
      providesTags: ['Posts'],
    }),
  }),
})

export const {
  useGetFeedPostsQuery,
  useGetFeedImageQuery,
  useLazyGetFeedImageQuery,
  useCreatePostMutation,
  useGetUserPostsQuery,
} = postsApi
