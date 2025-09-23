import type { IFindAllResults } from '@core/types/utils/IFindAllResults'

import type { ICreateUserDTO, IFindAllUsersDTO } from '../DTOs/IUsersDTOs'
import type { IUser } from '../models/IUser'

export interface IUsersRepository {
  findAll(data: IFindAllUsersDTO): Promise<IFindAllResults<IUser>>
  findByEmail(email: string): Promise<IUser | null>
  create(data: ICreateUserDTO): Promise<IUser>
  findById(id: string): Promise<IUser | null>
}
