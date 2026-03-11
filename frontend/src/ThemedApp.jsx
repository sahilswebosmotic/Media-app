import React, { useMemo } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import App from './App.jsx'
import { getTheme } from '@theme/theme'
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

export default ThemedApp;
