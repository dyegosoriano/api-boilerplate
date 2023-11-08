import { z } from 'zod'

export const validationCreateUser = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters').max(16, 'Password must be at most 16 characters').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one number or letter').nonempty('Required field'),
  email: z.string().email('Provide a valid email').min(6, 'Email must be at least 6 characters').max(100, 'Email must be at most 100 characters').nonempty('Required field'),
  name: z.string().min(3, 'Name must be at least 3 characters').max(100, 'Name must be at most 100 characters').nonempty('Required field')
})
