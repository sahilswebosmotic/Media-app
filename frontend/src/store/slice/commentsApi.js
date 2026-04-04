import { apiSlice } from './apiSlice'

export const commentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ postId, text, parentCommentId }) => ({
        url: '/posts/comment',
        method: 'POST',
        body: { postId, text, parentCommentId },
      }),
      invalidatesTags: ['Comments', 'Posts'],
    }),
    getPostComments: builder.query({
      query: ({ postId, page = 1, perPage = 10 }) => ({
        url: `/posts/${postId}/comments`,
        method: 'GET',
        params: { page, perPage },
      }),
      providesTags: (result, error, { postId }) => [
        { type: 'Comments', id: postId },
      ],
    }),
    getCommentReplies: builder.query({
      query: ({ commentId, page = 1, perPage = 5 }) => ({
        url: `/posts/comments/${commentId}/replies`,
        method: 'GET',
        params: { page, perPage },
      }),
      providesTags: (result, error, { commentId }) => [
        { type: 'Comments', id: `replies-${commentId}` },
      ],
    }),
    updateComment: builder.mutation({
      query: ({ commentId, text }) => ({
        url: `/posts/comments/${commentId}`,
        method: 'PUT',
        body: { text },
      }),
      invalidatesTags: ['Comments'],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/posts/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments', 'Posts'],
    }),
  }),
})

export const {
  useCreateCommentMutation,
  useGetPostCommentsQuery,
  useLazyGetPostCommentsQuery,
  useGetCommentRepliesQuery,
  useLazyGetCommentRepliesQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi
