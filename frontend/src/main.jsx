import React, { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from '@store/store'
import { AuthProvider } from './context/auth/AuthContext'
import { ToastProvider } from './context/toast/ToastProvider.jsx'
import { SocketProvider } from '@context/socket/SocketContext.jsx'

import { getTheme } from './theme'
import { CustomThemeProvider, useThemeContext } from './context/theme/ThemeContext'

const ThemedApp = () => {
  const { mode } = useThemeContext()
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
