import type { z } from 'zod'

import type * as validations from '@modules/accounts/validations/validationsUsers'

import type { IUser } from '../models/IUser'

export type IFindAllUsersDTO = z.infer<typeof validations.validationListUsers>
export type ICreateUserDTO = z.infer<typeof validations.validationCreateUser>

export type IUserResponseDTO = Omit<IUser, 'password'>
