import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '@pages/auth/LoginPage'
import SignUpPage from '@pages/auth/SignUpPage'
import HomePage from '@pages/home/HomePage'
import MyProfilePage from '@pages/profile/MyProfilePage'
import Layout from './layout/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
import DiscoverPage from '@pages/discover/DiscoverPage'
import { useSocketSync } from '@features/socket/hooks/useSocketSync'
import PublicProfilePage from '@pages/profile/PublicProfilePage'

function App() {
  useSocketSync();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/discover' element={<DiscoverPage />} />
          <Route path='/user-profile' element={<MyProfilePage />} />
          <Route path='/public-profile/:userId' element={<PublicProfilePage />} />
        </Route>
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
