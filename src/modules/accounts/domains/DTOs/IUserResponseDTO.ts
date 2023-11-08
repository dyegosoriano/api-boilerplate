import { IUser } from '../models/IUser'

export type IUserResponseDTO = Omit<IUser, 'password'>
