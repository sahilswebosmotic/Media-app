import { useState } from "react"
import { Box, TextField, Button, Stack, Avatar, useTheme, Typography } from "@mui/material"
import { useCreateCommentMutation } from "../../store/slice/commentsApi"
import { useAuth } from "../../context/auth/useAuth"
import { useToast } from "../../context/toast/useToast"

const AddComment = ({ postId, parentCommentId, onSuccess }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [text, setText] = useState("");
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const maxLength = 500;
  const remaining = maxLength - text.length;

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      await createComment({ 
        postId, 
        text: text.trim(), 
        parentCommentId 
      }).unwrap();
      setText("");
      showToast("Comment posted successfully!", "success");
      if (onSuccess) onSuccess();
    } catch (error) {
      showToast(error?.data?.message || "Failed to post comment", "error");
      console.error("Failed to create comment:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
      <Avatar
        src={user?.profilePhoto}
        sx={{ width: 36, height: 36, mt: 0.5 }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder={parentCommentId ? "Write a reply..." : "Write a comment..."}
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, maxLength))}
          onKeyPress={handleKeyPress}
          size="small"
          autoFocus={parentCommentId}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.100",
            },
          }}
        />
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
          <Typography 
            variant="caption" 
            color={remaining < 50 ? "error.main" : "text.secondary"}
          >
            {remaining} characters remaining
          </Typography>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!text.trim() || isLoading || remaining < 0}
            size="small"
          >
            {isLoading ? "Posting..." : parentCommentId ? "Reply" : "Comment"}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default AddComment;
