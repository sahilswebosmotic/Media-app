import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@features/auth/context/useAuth'
import LoadingScreen from '@components/ui/LoadingScreen'

export default function ProtectedRoute() {
  const { isAuthenticated, isInitializing } = useAuth()

  if (isInitializing) {
    return (
      <LoadingScreen />
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
