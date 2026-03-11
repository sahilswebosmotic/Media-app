import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from '@store/store'
import { AuthProvider } from '@features/auth/context/AuthContext'
import { ToastProvider } from '@context/toast/ToastContext'
import { SocketProvider } from '@features/socket/context/SocketContext'

import { CustomThemeProvider } from '@theme/ThemeContext'
import ThemedApp from './ThemedApp'


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
