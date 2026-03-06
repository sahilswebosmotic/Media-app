import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  useTheme,
  Box,
  alpha
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutConfirmationDialog = ({ open, onClose, onConfirm }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: theme.palette.background.paper,
          p: 1,
          maxWidth: 400
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: alpha(theme.palette.error.main, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'error.main'
          }}
        >
          <LogoutIcon fontSize="small" />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Sign Out?
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText sx={{ color: 'text.secondary', fontWeight: 500 }}>
          Are you sure you want to sign out? You will need to log back in to access your account.
        </DialogContentText>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button 
          onClick={onClose}
          sx={{ 
            color: 'text.secondary', 
            fontWeight: 700,
            '&:hover': { bgcolor: alpha(theme.palette.text.secondary, 0.05) }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{
            borderRadius: 2,
            px: 3,
            fontWeight: 800,
            boxShadow: 'none',
            '&:hover': {
              bgcolor: theme.palette.error.dark,
              boxShadow: 'none'
            }
          }}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirmationDialog;
