import { Typography } from '@mui/material';

/**
 * AuthError component displays a central, subtle error message
 * mimicking Instagram's general error display for input fields.
 */
const AuthError = ({ message }) => {
  if (!message) return null;
  
  return (
    <Typography
      color="error"
      variant="body2"
      align="center"
      sx={{
        mt: 0.5,
        mb: 1.5,
        fontSize: '0.88rem',
        fontWeight: 500,
        lineHeight: 1.4,
        letterSpacing: '0.01em',
        animation: 'fadeIn 0.3s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(-4px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {message}
    </Typography>
  );
};

export default AuthError;
