import { yupResolver } from '@hookform/resolvers/yup'
import {  Button, Stack } from '@mui/material'
import { useLoginMutation } from '@features/auth/api/auth.api'
import { useAuth } from '../context/useAuth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import AuthFormCard from './AuthFormCard'
import AuthRedirectText from './AuthRedirectText'
import AuthFieldList from './AuthFieldList'
import { useToast } from '@context/toast/useToast'
import { loginSchema } from '../validation/login.schema'
import { defaultValues } from '../validation/login.schema'
import { LOGIN_FIELDS } from '../common/form.fields'

import AuthError from './AuthError'


const LoginForm = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loginUser, { isLoading }] = useLoginMutation()
  const { showSuccess } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (values) => {
    try {
      const response = await loginUser(values).unwrap()
      login(response)
      showSuccess(`Welcome back!`);
      navigate('/home')
    } catch (error) {
      setError('root.apiError', {
        message: 
         'Invalid Credentials. Please try again.',
      })
    }
  }


  return (
    <AuthFormCard title='Sign In' subtitle='Login to your account'>
      <Stack component='form' onSubmit={handleSubmit(onSubmit)} noValidate spacing={1.6}>
        {/* <Alert varian'> */}
          <AuthError message={errors.root?.apiError?.message} />
          {/* </Alert> */}

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

export default LoginForm
