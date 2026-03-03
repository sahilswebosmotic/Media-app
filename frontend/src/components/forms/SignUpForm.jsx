import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import AuthFormCard from './AuthFormCard'
import AuthRedirectText from './AuthRedirectText'
import { useSignUpMutation } from '@store/slice/authApi'
import AuthFieldList from './AuthFieldList'
import { useToast } from '../../context/toast/useToast'

const signUpSchema = yup.object({
  firstname: yup
    .string()
    .required('Firstname is required.')
    .min(2, 'Firstname must be at least 2 characters.')
    .max(30, 'Firstname must be at most 30 characters.')
    .matches(/^[a-zA-Z0-9]+$/, 'Firstname must be alphanumeric.'),
  lastname: yup
    .string()
    .required('Lastname is required.')
    .min(2, 'Lastname must be at least 2 characters.')
    .max(30, 'Lastname must be at most 30 characters.')
    .matches(/^[a-zA-Z0-9]+$/, 'Lastname must be alphanumeric.'),
  email: yup.string().email('Enter a valid email.').required('Email is required.'),
  username: yup
    .string()
    .required('Username is required.')
    .min(6, 'Username must be at least 6 characters.')
    .max(30, 'Username must be at most 30 characters.')
    .matches(/^[a-zA-Z0-9-_@.]+$/, 'Username contains invalid characters.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .max(15, 'Password must be at most 15 characters.'),
  isPrivate: yup.boolean().required(),
})

const defaultValues = {
  firstname: '',
  lastname: '',
  email: '',
  username: '',
  password: '',
  isPrivate: false,
}

const SignUpForm = () => {
  const navigate = useNavigate()
  const [signUpUser, { isLoading }] = useSignUpMutation()
  const {showSuccess} = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues,
    resolver: yupResolver(signUpSchema),
  })

  const onSubmit = async (values) => {
    try {
      await signUpUser(values).unwrap()
      showSuccess("Signup successful. Please login.");
      navigate('/')
    } catch (error) {
      setError('root.apiError', {
        message: error?.data?.message || 'Unable to sign up. Please try again.',
      })
    }
  }

  const SIGNUP_FIELDS = [
    { label: 'Firstname', name: 'firstname' },
    { label: 'Lastname', name: 'lastname' },
    { label: 'Email', name: 'email' },
    { label: 'UserName', name: 'username' },
    { label: 'Password', name: 'password', type: 'password' },
  ]

  return (
    <AuthFormCard title='Sign Up' subtitle='Create your account'>
      <Stack component='form' onSubmit={handleSubmit(onSubmit)} noValidate spacing={1.6}>
        {errors.root?.apiError?.message && <Alert severity='error' variant="filled">{errors.root.apiError.message}</Alert>}


        <AuthFieldList fields={SIGNUP_FIELDS} register={register} errors={errors} />

        <FormControlLabel
          control={<Checkbox {...register('isPrivate')} />}
          label='Make account private'
          sx={{
            m: 0,
            mt: 0.4,
            '& .MuiFormControlLabel-label': { color: 'text.secondary', fontSize: '0.92rem' },
          }}
        />

        <Button
          type='submit'
          variant='contained'
          size='large'
          disabled={isLoading}
          sx={{ mt: 1.2, py: 1.3, fontSize: '0.98rem' }}
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </Button>

        <AuthRedirectText prompt='Already have an account?' linkLabel='Sign in' onClick={() => navigate('/')} />
      </Stack>
    </AuthFormCard>
  )
}

export default SignUpForm
