import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@context/useAuth'

const PublicRoute = () => {
  const { isAuthenticated, isInitializing } = useAuth()

  if (isInitializing) {
    return null
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}

export default PublicRoute
