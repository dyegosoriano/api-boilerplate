import { ICreateUserDTO } from '../DTOs/ICreateUserDTO'
import { IFindAllUsersDTO } from '../DTOs/IFindAllUsersDTO'
import { IFindAllUsersResultDTO } from '../DTOs/IFindAllUsersResultDTO'
import { IUser } from '../models/IUser'

export interface IUsersRepository {
  findAll(data: IFindAllUsersDTO): Promise<IFindAllUsersResultDTO>
  findByEmail(email: string): Promise<IUser | null>
  create(data: ICreateUserDTO): Promise<IUser>
  findById(id: string): Promise<IUser | null>
}
