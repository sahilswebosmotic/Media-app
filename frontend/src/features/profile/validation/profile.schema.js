import * as yup from 'yup'

export const defaultValues = {
  firstname: '',
  lastname: '',
  username: '',
  profilePhotoFile: null,
}

export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/webp']
export const MAX_FILE_SIZE = 20 * 1024 * 1024

export const profileSchema = yup.object({
  firstname: yup
    .string()
    .required('First name is required.')
    .min(2, 'First name must be at least 2 characters.')
    .max(30, 'First name must be at most 30 characters.')
    .matches(/^[a-zA-Z0-9]+$/, 'First name must contain only alphanumeric characters.'),
  lastname: yup
    .string()
    .required('Last name is required.')
    .min(2, 'Last name must be at least 2 characters.')
    .max(30, 'Last name must be at most 30 characters.')
    .matches(/^[a-zA-Z0-9]+$/, 'Last name must contain only alphanumeric characters.'),
  username: yup
    .string()
    .required('Username is required.')
    .min(6, 'Username must be at least 6 characters.')
    .max(30, 'Username must be at most 30 characters.')
    .matches(/^[a-zA-Z0-9-_@.]+$/, 'Username can include letters, numbers, -, _, @ and . only.'),
  profilePhotoFile: yup
    .mixed()
    .nullable()
    .test('fileType', 'Only jpeg, png, bmp, gif and webp are supported.', (file) => {
      if (!file) return true
      return SUPPORTED_IMAGE_TYPES.includes(file.type)
    })
    .test('fileSize', 'Image must be 20MB or less.', (file) => {
      if (!file) return true
      return file.size <= MAX_FILE_SIZE
    }),
})

export const formatDate = (value) => {
  if (!value) return 'N/A'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'N/A'
  return date.toLocaleString()
}
