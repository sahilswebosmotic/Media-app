import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { DarkModeOutlined as DarkModeIcon, LightModeOutlined as LightModeIcon } from '@mui/icons-material';
import { useThemeContext } from '../../context/theme/ThemeContext';

const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton 
        onClick={toggleTheme} 
        sx={{ 
          color: mode === 'light' ? 'primary.main' : 'primary.light',
          bgcolor: mode === 'light' ? 'rgba(2, 132, 199, 0.05)' : 'rgba(125, 211, 252, 0.05)',
          '&:hover': {
            bgcolor: mode === 'light' ? 'rgba(2, 132, 199, 0.1)' : 'rgba(125, 211, 252, 0.1)',
          },
          border: '1px solid',
          borderColor: mode === 'light' ? 'rgba(2, 132, 199, 0.2)' : 'rgba(125, 211, 252, 0.2)',
          borderRadius: 3,
          p: 1
        }}
      >
        {mode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
