import * as Yup from 'yup'

export const validationCreateUser = Yup.object().shape({
  email: Yup.string().max(100).strict().email('Provide a valid email').required('Required field'),
  name: Yup.string().min(3, 'Name must be at least 3 characters').max(100).required('Required field'),
  password: Yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one number or letter')
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .required('Required field')
})
