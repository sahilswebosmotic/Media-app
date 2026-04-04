import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: {
          main: mode === 'dark' ? '#ffffff' : '#000000',
          dark: mode === 'dark' ? '#e6e6e6' : '#1a1a1a',
          light: mode === 'dark' ? '#ffffff' : '#333333',
        },
        secondary: {
          main: mode === 'dark' ? '#a8a8a8' : '#737373',
        },
        background: {
          default: mode === 'dark' ? '#000000' : '#fafafa',
          paper: mode === 'dark' ? '#000000' : '#ffffff',
        },
        text: {
          primary: mode === 'dark' ? '#ffffff' : '#000000',
          secondary: mode === 'dark' ? '#a8a8a8' : '#737373',
        },
        divider: mode === 'dark' ? '#262626' : '#dbdbdb',
      },
      typography: {
        fontFamily: "'Inter', 'Plus Jakarta Sans', 'Helvetica Neue', sans-serif",
        h1: { fontWeight: 800, letterSpacing: '-0.02em' },
        h2: { fontWeight: 800, letterSpacing: '-0.02em' },
        h3: { fontWeight: 700, letterSpacing: '-0.01em' },
        button: {
          textTransform: 'none',
          fontWeight: 700,
        },
      },
      shape: {
        borderRadius: 8,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: mode === 'dark' ? '#000000' : '#ffffff',
              backgroundImage: 'none',
            },
          },
        },
        MuiCheckbox: {
          styleOverrides: {
            root: {
              color: mode === 'dark' ? '#a8a8a8' : '#737373',
              '&.Mui-checked': {
                color: mode === 'dark' ? '#ffffff' : '#000000',
              },
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: mode === 'dark' ? '#363636' : '#dbdbdb',
                },
                '&:hover fieldset': {
                  borderColor: mode === 'dark' ? '#8e8e8e' : '#a8a8a8',
                },
                '&.Mui-focused fieldset': {
                  borderColor: mode === 'dark' ? '#ffffff' : '#000000',
                },
              },
              '& .MuiInputLabel-root': {
                color: mode === 'dark' ? '#a8a8a8' : '#737373',
              },
              '& .MuiInputBase-input': {
                color: mode === 'dark' ? '#ffffff' : '#000000',
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '14px',
              borderRadius: '8px',
            },
            containedPrimary: {
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              color: '#ffffff',
              padding: '7px 16px',
              border: 'none',
              '&:hover': {
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                opacity: 0.9,
              },
              boxShadow: 'none',
              '&:active': {
                opacity: 0.8,
              },
            },
            text: {
              color: mode === 'dark' ? '#ffffff' : '#000000',
              padding: '7px 16px',
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              },
            },
            outlined: {
              padding: '7px 16px',
              borderColor: mode === 'dark' ? '#363636' : '#dbdbdb',
              color: mode === 'dark' ? '#ffffff' : '#000000',
              fontWeight: 600,
              '&:hover': {
                borderColor: mode === 'dark' ? '#363636' : '#dbdbdb',
                backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 0,
              border: mode === 'dark' ? '1px solid #262626' : '1px solid #efefef',
              backgroundColor: mode === 'dark' ? '#000000' : '#ffffff',
              boxShadow: 'none',
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
