import { 
  Box, 
  Typography, 
  Avatar, 
  Stack, 
  IconButton, 
  useTheme,
  alpha 
} from "@mui/material"
import {
  ChatBubbleOutline as CommentIcon,
  Repeat as RetweetIcon,
  FavoriteBorder as LikeIcon,
  Favorite as LikedIcon,
  ShareOutlined as ShareIcon,
  MoreHoriz as MoreIcon
} from '@mui/icons-material'
import FeedImage from "./FeedImage"
import SharePostDialog from "./SharePostDialog"
import { useLikePostMutation, useIsPostLikedQuery } from "../../store/slice/postsApi"
import { useToast } from "../../context/toast/useToast"
import { useState, useEffect } from "react"

const FeedCard = ({ post, onOpen, onDelete, currentUserId }) => {
  const theme = useTheme();
  const { showToast } = useToast();
  const userData = post.userData || post.userId;
  
  const [likePost, { isLoading: isLiking }] = useLikePostMutation();
  const { data: likedData } = useIsPostLikedQuery(post._id);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  useEffect(() => {
    if (likedData?.data?.isLiked !== undefined) {
      setIsLiked(likedData.data.isLiked);
    }
  }, [likedData]);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (isLiking) return;

    const previousLiked = isLiked;
    const previousCount = likesCount;

    setIsLiked(!previousLiked);
    setLikesCount(previousLiked ? previousCount - 1 : previousCount + 1);

    try {
      const result = await likePost(post._id).unwrap();
      setIsLiked(result.data.isLiked);
      setLikesCount(result.data.likesCount);
    } catch (error) {
      setIsLiked(previousLiked);
      setLikesCount(previousCount);
      showToast(error?.data?.message || "Failed to like post", "error");
      console.error('Failed to like post:', error);
    }
  };

  const handleComment = (e) => {
    e.stopPropagation();
    onOpen(post);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    setShareDialogOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          p: { xs: 2, sm: 2.25 },
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: 'transparent',
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.035)' 
              : 'rgba(15, 20, 25, 0.03)',
          },
          transition: 'background-color 0.2s ease',
          cursor: 'pointer'
        }}
        onClick={() => onOpen(post)}
      >
        <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }}>
          <Avatar 
            src={userData?.profilePhoto} 
            sx={{ width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 }, mt: 0.5 }}
          />
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ minWidth: 0, flexWrap: 'nowrap' }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 800, 
                    fontSize: '0.98rem',
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap',
                    '&:hover': { textDecoration: 'underline' } 
                  }}
                >
                  {userData?.firstname} {userData?.lastname}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  sx={{ 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap' 
                  }}
                >
                  @{userData?.username} · {post.createdAt.slice(0, 10)}
                </Typography>
              </Stack>
              <IconButton size="small">
                <MoreIcon fontSize="small" />
              </IconButton>
            </Stack>

            <Typography variant="body2" sx={{ mt: 0.5, mb: 1.5, lineHeight: 1.5, wordBreak: 'break-word', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              {post.title}
            </Typography>
            
            {post.description && (
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.6, display: 'block' }}>
                {post.description}
              </Typography>
            )}

            {post.filePath && (
              <Box 
                sx={{ 
                  borderRadius: 3, 
                  overflow: 'hidden', 
                  border: `1px solid ${theme.palette.divider}`,
                  maxHeight: { xs: 300, sm: 500 }
                }}
              >
                <FeedImage
                  postId={post._id}
                  title={post.title}
                  hasImage={true}
                />
              </Box>
            )}

            <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.5, ml: -1, maxWidth: 450 }}>
              <IconButton 
                size="small" 
                onClick={handleComment}
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.1) } }}
              >
                <CommentIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  {post.commentsCount || 0}
                </Typography>
              </IconButton>
              <IconButton 
                size="small" 
                onClick={handleShare}
                sx={{ color: 'text.secondary', '&:hover': { color: 'success.main', bgcolor: alpha(theme.palette.success.main, 0.1) } }}
              >
                <RetweetIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  {post.sharesCount || 0}
                </Typography>
              </IconButton>
              <IconButton 
                size="small" 
                onClick={handleLike}
                disabled={isLiking}
                sx={{ 
                  color: isLiked ? 'error.main' : 'text.secondary', 
                  '&:hover': { 
                    color: 'error.main', 
                    bgcolor: alpha(theme.palette.error.main, 0.1) 
                  },
                  transition: 'all 0.2s ease',
                  transform: isLiked ? 'scale(1.1)' : 'scale(1)',
                  '&:active': {
                    transform: 'scale(0.95)',
                  }
                }}
              >
                {isLiked ? (
                  <LikedIcon 
                    sx={{ 
                      fontSize: { xs: 18, sm: 20 },
                      animation: isLiked ? 'heartBeat 0.3s ease' : 'none',
                      '@keyframes heartBeat': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.3)' },
                        '100%': { transform: 'scale(1)' },
                      }
                    }} 
                  />
                ) : (
                  <LikeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                )}
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  {likesCount}
                </Typography>
              </IconButton>
              <IconButton 
                size="small" 
                onClick={handleShare}
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.1) } }}
              >
                <ShareIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <SharePostDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        post={post}
      />
    </>
  )
}

export default FeedCard
