import { z } from 'zod'

import { validationCreateUser } from '@modules/accounts/validations/validationsUsers'

import { IUser } from '../models/IUser'

export type IUserResponseDTO = Omit<IUser, 'password'>

export interface IFindAllUsersResultDTO {
  total_users: number
  users: IUser[]
}

export interface IFindAllUsersDTO {
  page_size?: number
  email?: string
  name?: string
  page?: number
}

export type ICreateUserDTO = z.infer<typeof validationCreateUser>
