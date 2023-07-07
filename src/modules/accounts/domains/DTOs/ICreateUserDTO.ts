import { z } from 'zod'

import { validationCreateUser } from '@modules/accounts/validations/validationCreateUser'

export type ICreateUserDTO = z.infer<typeof validationCreateUser>
