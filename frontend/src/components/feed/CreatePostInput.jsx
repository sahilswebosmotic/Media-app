import React, { useState } from 'react';
import { 
  Box, 
  Avatar, 
  InputBase, 
  Button, 
  Stack, 
  IconButton, 
  Divider,
  useTheme,
  alpha,
  
} from '@mui/material';
import { 
  ImageOutlined as ImageIcon,
  GifBoxOutlined as GifIcon,
  PollOutlined as PollIcon,
  EmojiEmotionsOutlined as EmojiIcon,
  CalendarMonthOutlined as ScheduleIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/auth/useAuth';

const CreatePostInput = ({ onOpenCreateDialog }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const [text, setText] = useState('');
  const handlePostClick = () => {
    onOpenCreateDialog(text);
    setText('');
  };

  return (
    <Box 
      sx={{ 
        p: 2, 
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.4)' : '#fff',
        transition: 'background-color 0.3s ease'
      }}
    >
      <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }}>
        <Avatar 
          src={user?.profilePhoto} 
          sx={{ width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 } }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <InputBase
            multiline
            fullWidth
            placeholder="What's happening?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClick={() => onOpenCreateDialog(text)}
            sx={{ 
              fontSize: { xs: '1.1rem', sm: '1.25rem' }, 
              color: 'text.primary',
              py: 0.5,
              '& .MuiInputBase-input': {
                '&::placeholder': {
                  opacity: 0.7,
                  color: 'text.secondary'
                }
              }
            }}
          />
          
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Stack direction="row" spacing={0.5}>
              <IconButton size="small" color="primary" onClick={() => onOpenCreateDialog(text)}>
                <ImageIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              </IconButton>
              <IconButton size="small" color="primary" onClick={() => onOpenCreateDialog(text)}>
                <GifIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              </IconButton>
              {!onOpenCreateDialog && <IconButton size="small" color="primary" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <PollIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              </IconButton>}
              <IconButton size="small" color="primary" onClick={() => onOpenCreateDialog(text)}>
                <EmojiIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              </IconButton>
            </Stack>
            
            <Button 
              variant="contained" 
              disabled={!text.trim() && !onOpenCreateDialog}
              onClick={handlePostClick}
              sx={{ 
                borderRadius: 20, 
                px: { xs: 2, sm: 3 }, 
                py: { xs: 0.5, sm: 1 },
                fontWeight: 800,
                textTransform: 'none',
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              Post
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CreatePostInput;
