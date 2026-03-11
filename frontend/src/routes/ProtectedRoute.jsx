import { Box, CircularProgress } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@features/auth/context/useAuth'

export default function ProtectedRoute() {
  const { isAuthenticated, isInitializing } = useAuth()

  if (isInitializing) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>  
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
