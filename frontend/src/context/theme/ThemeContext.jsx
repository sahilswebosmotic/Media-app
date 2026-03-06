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
          main: '#38bdf8',
          dark: '#0284c7',
          light: '#7dd3fc',
        },
        secondary: {
          main: '#818cf8',
        },
        background: {
          default: mode === 'dark' ? '#0F172A' : '#F8FAFC',
          paper: mode === 'dark' ? 'rgba(30, 41, 59, 0.7)' : '#FFFFFF',
        },
        text: {
          primary: mode === 'dark' ? '#F1F5F9' : '#1E293B',
          secondary: mode === 'dark' ? '#94A3B8' : '#64748B',
        },
      },
      typography: {
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        h1: { fontWeight: 800 },
        h2: { fontWeight: 800 },
        h3: { fontWeight: 700 },
        button: {
          textTransform: 'none',
          fontWeight: 700,
        },
      },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 10,
              padding: '8px 16px',
            },
            containedPrimary: {
              boxShadow: mode === 'dark' 
                ? '0 10px 15px -3px rgba(56, 189, 248, 0.2)' 
                : '0 10px 15px -3px rgba(56, 189, 248, 0.3)',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 16,
              border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
              boxShadow: mode === 'dark' 
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' 
                : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(8px)',
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
