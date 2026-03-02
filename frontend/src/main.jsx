import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from '@store/store'
import { AuthProvider } from '@context/AuthContext'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5ea0ff',
    },
    background: {
      default: '#0b1220',
      paper: '#121a2b',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={darkTheme}>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
