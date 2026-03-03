import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from '@store/store'
import { AuthProvider } from './context/auth/AuthContext'
import { ToastProvider } from './context/toast/ToastProvider.jsx'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7dd3fc',
      dark: '#38bdf8',
    },
    secondary: {
      main: '#a78bfa',
    },
    background: {
      default: '#050a16',
      paper: '#0f172a',
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#94a3b8',
    },
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
          background:
            'radial-gradient(circle at 10% -5%, rgba(14, 165, 233, 0.2), transparent 28%), radial-gradient(circle at 90% 10%, rgba(99, 102, 241, 0.16), transparent 30%), #050a16',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderColor: 'rgba(148, 163, 184, 0.16)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(148, 163, 184, 0.16)',
          backgroundColor: 'rgba(15, 23, 42, 0.78)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingInline: 16,
        },
        containedPrimary: {
          boxShadow: '0 8px 24px rgba(56, 189, 248, 0.28)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: 'rgba(15, 23, 42, 0.48)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
          border: '1px solid rgba(148, 163, 184, 0.2)',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 14,
          border: '1px solid rgba(148, 163, 184, 0.2)',
          backgroundColor: 'rgba(15, 23, 42, 0.98)',
        },
      },
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
    </ToastProvider>
  </StrictMode>,
)
