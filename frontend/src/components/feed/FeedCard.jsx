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
  ShareOutlined as ShareIcon,
  MoreHoriz as MoreIcon
} from '@mui/icons-material'
import FeedImage from "./FeedImage"

const FeedCard = ({ post, onOpen, onDelete, currentUserId }) => {
  const theme = useTheme();
  const userData = post.userData || post.userId;

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: 'transparent',
        '&:hover': {
          bgcolor: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.02)' 
            : 'rgba(0, 0, 0, 0.01)',
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
            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.1) } }}>
              <CommentIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
              <Typography variant="caption" sx={{ ml: 0.5 }}>24</Typography>
            </IconButton>
            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'success.main', bgcolor: alpha(theme.palette.success.main, 0.1) } }}>
              <RetweetIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
              <Typography variant="caption" sx={{ ml: 0.5 }}>5</Typography>
            </IconButton>
            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: alpha(theme.palette.error.main, 0.1) } }}>
              <LikeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
              <Typography variant="caption" sx={{ ml: 0.5 }}>142</Typography>
            </IconButton>
            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.1) } }}>
              <ShareIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default FeedCard
