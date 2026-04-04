import { Box, Stack, Typography, CircularProgress, Button } from "@mui/material"
import CommentItem from "./CommentItem"
import AddComment from "./AddComment"
import { useGetPostCommentsQuery } from "../../store/slice/commentsApi"
import { useState } from "react"

const CommentsList = ({ postId }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetPostCommentsQuery({ 
    postId, 
    page, 
    perPage: 10 
  });

  const comments = data?.data?.comments || [];
  const pagination = data?.data?.pagination;

  if (isLoading && page === 1) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ py: 2 }}>
        Failed to load comments
      </Typography>
    );
  }

  return (
    <Box>
      <AddComment postId={postId} />
      
      <Stack spacing={2} sx={{ mt: 2 }}>
        {comments.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            No comments yet. Be the first to comment!
          </Typography>
        ) : (
          <>
            {comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} postId={postId} />
            ))}
            
            {pagination && pagination.currentPage < pagination.totalPages && (
              <Button 
                onClick={() => setPage(page + 1)}
                disabled={isLoading}
                sx={{ alignSelf: 'center' }}
              >
                {isLoading ? 'Loading...' : 'Load More Comments'}
              </Button>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default CommentsList;
