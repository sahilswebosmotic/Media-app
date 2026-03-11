import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@features/auth/context/useAuth'

export default function PublicRoute() {
  const { isAuthenticated, isInitializing } = useAuth()

  if (isInitializing) {
    return null
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}

