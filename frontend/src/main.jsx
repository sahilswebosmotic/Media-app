import React, { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from '@store/store'
import { AuthProvider } from '@features/auth/context/AuthContext'
import { ToastProvider } from '@context/toast/ToastContext'
import { SocketProvider } from '@features/socket/context/SocketContext'

import { getTheme } from '@theme/theme'
import { CustomThemeProvider } from '@theme/ThemeContext'
import { useTheme } from '@theme/useTheme'

const ThemedApp = () => {
  const { mode } = useTheme()
  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <Provider store={store}>
        <AuthProvider>
          <SocketProvider>
            <CustomThemeProvider>
              <ThemedApp />
            </CustomThemeProvider>
          </SocketProvider>
        </AuthProvider>
      </Provider>
    </ToastProvider>
  </StrictMode>,
)
