import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SignIn from '@pages/SignIn'
import SignUp from '@pages/SignUp'
import Home from '@pages/Home'
import UserProfile from '@components/profile/UserProfileForm'
import Layout from './layout/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
import Discover from '@pages/Discover'
import { useSocketSync } from '@hooks/useSocketSync'
import PublicProfile from '@pages/PublicProfile'

function App() {
  useSocketSync();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/discover' element={<Discover />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/public-profile/:userId' element={<PublicProfile />} />
        </Route>
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
