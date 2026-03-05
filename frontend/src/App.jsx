import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SignIn from '@pages/SignIn'
import SignUp from '@pages/SignUp'
import Home from '@pages/Home'
import UserProfile from '@components/profile/UserProfileForm'
import VerifyAccount from '@pages/VerifyAccount'
import DiscoverPeople from '@pages/DiscoverPeople'
import PublicProfile from '@pages/PublicProfile'
import Layout from './layout/Layout'
import ProtectedRoute from '@components/routes/ProtectedRoute'
import PublicRoute from '@components/routes/PublicRoute'
import { useSocketSync } from './hooks/useSocketSync'

function App() {
  useSocketSync();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          {/* <Route> */}
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/verify-account' element={<VerifyAccount />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          {/* <Route> */}
          <Route element={<Layout />}>
            <Route path='/home' element={<Home />} />
            <Route path='/user-profile' element={<UserProfile />} />
            <Route path='/discover' element={<DiscoverPeople />} />
            <Route path='/profile/:userId' element={<PublicProfile />} />
          </Route>
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
