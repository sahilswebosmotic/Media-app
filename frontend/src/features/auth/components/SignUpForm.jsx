import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import AuthFormCard from './AuthFormCard'
import AuthRedirectText from './AuthRedirectText'
import { useSignUpMutation } from '@features/auth/api/auth.api'
import AuthFieldList from './AuthFieldList'
import { useToast } from '@context/toast/useToast'
import { signUpSchema } from '../validation/signup.schema'
import { defaultValues } from '../validation/signup.schema'
import { SIGNUP_FIELDS } from '../common/form.fields'

import AuthError from './AuthError'


export default function SignUpForm () {
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
    } catch {
      setError('root.apiError', {
        message: 'Invalid Credentials Please try again.',
      })
    }
  }

  return (
    <AuthFormCard title='Sign Up' subtitle='Create your account'>
      <Stack component='form' onSubmit={handleSubmit(onSubmit)} noValidate spacing={1.6}>
        
        <AuthError message={errors.root?.apiError?.message} />
        


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
