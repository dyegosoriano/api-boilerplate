import { IFindAllUsersResults } from '@core/types/utils/IFindAllUsersResults'

import { ICreateUserDTO, IFindAllUsersDTO } from '../DTOs/IUsersDTOs'
import { IUser } from '../models/IUser'

export interface IUsersRepository {
  findAll(data: IFindAllUsersDTO): Promise<IFindAllUsersResults<IUser>>
  findByEmail(email: string): Promise<IUser | null>
  create(data: ICreateUserDTO): Promise<IUser>
  findById(id: string): Promise<IUser | null>
}
