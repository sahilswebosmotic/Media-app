import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Stack, Typography } from '@mui/material'
import { useLoginMutation, useResendVerificationMutation } from '@store/slice/authApi'
import { useAuth } from '@context/auth/useAuth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import AuthFormCard from './AuthFormCard'
import AuthRedirectText from './AuthRedirectText'
import AuthFieldList from './AuthFieldList'
import useToast from '@context/toast/useToast'
import { useState } from 'react'


const signInSchema = yup.object({
  email: yup.string().email('Enter a valid email.').required('Email is required.'),
  password: yup.string().required('Password is required.'),
})

const defaultValues = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loginUser, { isLoading }] = useLoginMutation()
  const [resendVerification, { isLoading: isResending }] = useResendVerificationMutation()
  const { showSuccess, showError } = useToast();
  const [unverifiedEmail, setUnverifiedEmail] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm({
    defaultValues,
    resolver: yupResolver(signInSchema),
  })

  const onSubmit = async (values) => {
    try {
      setUnverifiedEmail(null)
      const response = await loginUser(values).unwrap()
      login(response)
      showSuccess(`Welcome back!`);
      navigate('/home')
    } catch (error) {
      if (error?.data?.message === 'Account not verified.') {
        setUnverifiedEmail(values.email)
      }
      setError('root.apiError', {
        message: error?.data?.message || 'Unable to sign in. Please try again.',
      })
    }
  }

  const handleResend = async () => {
    try {
      await resendVerification({ email: unverifiedEmail }).unwrap()
      showSuccess('Verification email resent! Please check your inbox.')
      setUnverifiedEmail(null)
    } catch (error) {
      showError(error?.data?.message || 'Failed to resend verification email.')
    }
  }

  const LOGIN_FIELDS = [
    { label: 'Email', name: 'email' },
    { label: 'Password', name: 'password', type: 'password' },
  ]


  return (
    <AuthFormCard title='Sign In' subtitle='Login to your account'>
      <Stack component='form' onSubmit={handleSubmit(onSubmit)} noValidate spacing={1.6}>
        {errors.root?.apiError?.message && (
          <Alert
            severity='error'
            action={
              unverifiedEmail && (
                <Button color="inherit" size="small" onClick={handleResend} disabled={isResending}>
                  {isResending ? 'Sending...' : 'Resend'}
                </Button>
              )
            }
          >
            {errors.root.apiError.message}
          </Alert>
        )}

        <AuthFieldList fields={LOGIN_FIELDS} register={register} errors={errors} />

        <Button
          type='submit'
          variant='contained'
          size='large'
          disabled={isLoading}
          sx={{ mt: 1.2, py: 1.3, fontSize: '0.98rem' }}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        <AuthRedirectText
          prompt='New user?'
          linkLabel='Create account'
          onClick={() => navigate('/signup')}
        />
      </Stack>
    </AuthFormCard>
  )
}

export default SignInForm
