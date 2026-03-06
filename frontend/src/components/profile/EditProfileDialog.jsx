import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Avatar,
  IconButton,
  Stack,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { PhotoCamera as PhotoCameraIcon, Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';

const EditProfileDialog = ({
  open,
  onClose,
  onSubmit,
  register,
  errors,
  avatarSource,
  handleFileChange,
  handleRemoveAvatar,
  isUpdating,
  submitError,
  successMessage
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="xs"
      PaperProps={{
        sx: { borderRadius: 3, p: 1 }
      }}
    >
      <DialogTitle sx={{ fontWeight: 800, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Edit Profile
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent divider>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* Avatar Edit */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={avatarSource}
                sx={{ width: 100, height: 100, border: '2px solid', borderColor: 'divider' }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: 'background.paper',
                  boxShadow: 2,
                  '&:hover': { bgcolor: 'background.paper', opacity: 0.9 }
                }}
              >
                <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                <PhotoCameraIcon size="small" />
              </IconButton>
            </Box>
            <Button 
              size="small" 
              color="error" 
              startIcon={<DeleteIcon />} 
              onClick={handleRemoveAvatar}
              sx={{ fontWeight: 700 }}
            >
              Remove Photo
            </Button>
          </Box>

          {submitError && <Alert severity="error">{submitError}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <TextField
            fullWidth
            label="First Name"
            {...register('firstname')}
            error={!!errors.firstname}
            helperText={errors.firstname?.message}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Last Name"
            {...register('lastname')}
            error={!!errors.lastname}
            helperText={errors.lastname?.message}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Username"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
            variant="outlined"
          />
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ fontWeight: 700 }}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={onSubmit} 
          disabled={isUpdating}
          sx={{ borderRadius: 2, px: 3, fontWeight: 700 }}
        >
          {isUpdating ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
