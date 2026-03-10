import { createTheme } from '@mui/material';

export const getTheme = (mode) => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#7dd3fc' : '#6366f1',
        dark: isDark ? '#38bdf8' : '#4f46e5',
      },
      secondary: {
        main: '#a78bfa',
      },
      background: {
        default: isDark ? '#050a16' : '#f8fafc',
        paper: isDark ? '#0f172a' : '#ffffff',
      },
      text: {
        primary: isDark ? '#e2e8f0' : '#1e293b',
        secondary: isDark ? '#94a3b8' : '#64748b',
      },
      divider: isDark ? 'rgba(148, 163, 184, 0.16)' : 'rgba(15, 23, 42, 0.06)',
    },
    typography: {
      fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
      button: {
        textTransform: 'none',
        fontWeight: 700,
        letterSpacing: '0.02em',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: isDark
              ? 'radial-gradient(circle at 10% -5%, rgba(14, 165, 233, 0.2), transparent 28%), radial-gradient(circle at 90% 10%, rgba(99, 102, 241, 0.16), transparent 30%), #050a16'
              : 'radial-gradient(circle at 2% 10%, rgba(99, 102, 241, 0.12), transparent 25%), radial-gradient(circle at 98% 85%, rgba(14, 165, 233, 0.1), transparent 28%), radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.05), transparent 40%), #f8fafc',
            transition: 'background 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            minHeight: '100vh',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderColor: isDark ? 'rgba(148, 163, 184, 0.16)' : 'rgba(15, 23, 42, 0.06)',
            boxShadow: isDark ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.03)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${isDark ? 'rgba(148, 163, 184, 0.16)' : 'rgba(15, 23, 42, 0.06)'}`,
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.78)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            boxShadow: isDark ? '0 12px 32px rgba(2, 6, 23, 0.3)' : '0 8px 30px rgba(0, 0, 0, 0.04)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            paddingInline: 20,
            transition: 'all 0.2s ease',
          },
          containedPrimary: {
            boxShadow: isDark ? '0 8px 24px rgba(56, 189, 248, 0.28)' : '0 8px 20px rgba(99, 102, 241, 0.25)',
            '&:hover': {
              boxShadow: isDark ? '0 12px 32px rgba(56, 189, 248, 0.4)' : '0 12px 28px rgba(99, 102, 241, 0.35)',
              transform: 'translateY(-1px)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.48)' : 'rgba(255, 255, 255, 0.6)',
            '&:hover': {
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
            border: `1px solid ${isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(15, 23, 42, 0.04)'}`,
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(16px)',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
            border: `1px solid ${isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(15, 23, 42, 0.04)'}`,
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
  });
};
