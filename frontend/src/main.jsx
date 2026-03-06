import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from '@store/store'
import { AuthProvider } from './context/auth/AuthContext'
import { ToastProvider } from './context/toast/ToastProvider.jsx'
import { SocketProvider } from '@context/socket/SocketContext.jsx'

import { ThemeContextProvider } from './context/theme/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
    <Provider store={store}>
      <AuthProvider>
        <SocketProvider>
        <ThemeContextProvider>
          <CssBaseline />
          <App />
        </ThemeContextProvider>
        </SocketProvider>
      </AuthProvider>
    </Provider>
    </ToastProvider>
  </StrictMode>,
)
