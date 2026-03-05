import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Box, Typography, CircularProgress, Button, Container, Paper } from '@mui/material'
import { useVerifyAccountQuery } from '@store/slice/authApi'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const VerifyAccount = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const navigate = useNavigate()

    const { data, isLoading, isError, error } = useVerifyAccountQuery(token, {
        skip: !token,
    })

    useEffect(() => {
        if (data?.status === 'success') {
            const timer = setTimeout(() => {
                navigate('/')
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [data, navigate])

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%', textAlign: 'center', borderRadius: 4 }}>
                    {isLoading ? (
                        <>
                            <CircularProgress size={60} sx={{ mb: 2 }} />
                            <Typography variant="h5">Verifying your account...</Typography>
                        </>
                    ) : isError ? (
                        <>
                            <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
                            <Typography variant="h5" color="error" gutterBottom>
                                Verification Failed
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {error?.data?.message || 'Invalid or expired verification token.'}
                            </Typography>
                            <Button variant="contained" onClick={() => navigate('/')}>
                                Back to Login
                            </Button>
                        </>
                    ) : data?.status === 'success' ? (
                        <>
                            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                            <Typography variant="h5" color="success" gutterBottom>
                                Email Verified Successfully!
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                Your account is now active. Redirecting you to login...
                            </Typography>
                            <Button variant="outlined" onClick={() => navigate('/')}>
                                Go to Login Now
                            </Button>
                        </>
                    ) : (
                        <>
                            <ErrorOutlineIcon color="warning" sx={{ fontSize: 60, mb: 2 }} />
                            <Typography variant="h5" gutterBottom>
                                Missing Token
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                No verification token was found in the URL.
                            </Typography>
                            <Button variant="contained" onClick={() => navigate('/')}>
                                Back to Login
                            </Button>
                        </>
                    )}
                </Paper>
            </Box>
        </Container>
    )
}

export default VerifyAccount
