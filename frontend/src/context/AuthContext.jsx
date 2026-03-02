import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import { useLazyGetCurrentUserQuery } from '@store/slice/authApi'
import { useDispatch } from 'react-redux'
import { apiSlice } from '@store/slice/apiSlice'
import { AuthContext } from './authContextObject'

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [triggerGetCurrentUser] = useLazyGetCurrentUserQuery()

  useEffect(() => {
    let isMounted = true

    const initializeAuth = async () => {
      const token = Cookies.get('accessToken')
      if (!token) {
        if (isMounted) {
          setIsInitializing(false)
        }
        return
      }

      try {
        const response = await triggerGetCurrentUser(undefined, false).unwrap()
        const currentUser = response?.data ?? null
        if (isMounted) {
          setUser(currentUser)
          setIsAuthenticated(Boolean(currentUser))
        }
      } catch {
        Cookies.remove('accessToken')
        if (isMounted) {
          setUser(null)
          setIsAuthenticated(false)
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false)
        }
      }
    }

    initializeAuth()

    return () => {
      isMounted = false
    }
  }, [triggerGetCurrentUser])

  const login = useCallback((authResponse) => {
    const payload = authResponse?.data ?? authResponse
    const token = payload?.accessToken

    if (!token) {
      return
    }

    Cookies.set('accessToken', token, { sameSite: 'lax' })
    dispatch(apiSlice.util.resetApiState())
    setIsAuthenticated(true)
    triggerGetCurrentUser(undefined, false)
      .unwrap()
      .then((response) => {
        const currentUser = response?.data ?? null
        setUser(currentUser)
      })
      .catch(() => {
        const userData = { ...payload }
        delete userData.accessToken
        setUser(userData)
      })
      
  }, [dispatch, triggerGetCurrentUser])

  const logout = useCallback(() => {
    Cookies.remove('accessToken')
    dispatch(apiSlice.util.resetApiState())
    setUser(null)
    setIsAuthenticated(false)
  }, [dispatch])

  const setCurrentUser = useCallback((nextUser) => {
    setUser(nextUser)
    setIsAuthenticated(Boolean(nextUser))
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isInitializing,
      login,
      logout,
      setCurrentUser,
    }),
    [user, isAuthenticated, isInitializing, login, logout, setCurrentUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
