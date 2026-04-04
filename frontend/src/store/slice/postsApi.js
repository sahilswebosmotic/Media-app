import { apiSlice } from './apiSlice'

export const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedPosts: builder.query({
      query: ({ page = 1, perPage = 5, search = '', isMyPostsOnly = false } = {}) => ({
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
    getUsersPosts: builder.query({
      query: ({ userId, page = 1, perPage = 10 } = {}) => ({
        url: '/posts/get-user-posts',
        method: 'GET',
        params: { userId, page, perPage },
      }),
      providesTags: ['Posts'],
    }),

    // Likes endpoints
    likePost: builder.mutation({
      query: (postId) => ({
        url: '/posts/like-post',
        method: 'POST',
        body: { postId },
      }),
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            apiSlice.util.updateQueryData('getFeedPosts', undefined, (draft) => {
              const post = draft?.data?.data?.find((p) => p._id === postId)
              if (post) {
                post.likesCount = data.data.likesCount
              }
            })
          )
        } catch {}
      },
      invalidatesTags: ['Likes'],
    }),
    getPostLikes: builder.query({
      query: ({ postId, page = 1, perPage = 20 }) => ({
        url: `/posts/${postId}/likes`,
        method: 'GET',
        params: { page, perPage },
      }),
      providesTags: ['Likes'],
    }),
    isPostLiked: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}/is-liked`,
        method: 'GET',
      }),
      providesTags: (result, error, postId) => [{ type: 'Likes', id: postId }],
    }),

    // Shares endpoints
    sharePost: builder.mutation({
      query: ({ postId, sharedText }) => ({
        url: '/posts/share',
        method: 'POST',
        body: { postId, sharedText },
      }),
      invalidatesTags: ['Posts', 'Shares'],
    }),
    getPostShares: builder.query({
      query: ({ postId, page = 1, perPage = 20 }) => ({
        url: `/posts/${postId}/shares`,
        method: 'GET',
        params: { page, perPage },
      }),
      providesTags: ['Shares'],
    }),
    deleteShare: builder.mutation({
      query: (shareId) => ({
        url: `/posts/shares/${shareId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Shares', 'Posts'],
    }),
  }),
})

export const {
  useGetFeedPostsQuery,
  useGetFeedImageQuery,
  useLazyGetFeedImageQuery,
  useCreatePostMutation,
  useGetUsersPostsQuery,
  useLikePostMutation,
  useGetPostLikesQuery,
  useIsPostLikedQuery,
  useLazyIsPostLikedQuery,
  useSharePostMutation,
  useGetPostSharesQuery,
  useDeleteShareMutation,
} = postsApi
