import * as yup from 'yup'
export const signUpSchema = yup.object({
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

export const defaultValues = {
  firstname: '',
  lastname: '',
  email: '',
  username: '',
  password: '',
  isPrivate: false,
}