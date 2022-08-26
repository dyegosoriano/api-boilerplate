import { ICreateUserDTO } from '../DTOs/ICreateUserDTO'
import { IFindAllUsersDTO } from '../DTOs/IFindAllUsersDTO'
import { IUser } from '../models/IUser'

interface IUsersRepository {
  findAll(data: IFindAllUsersDTO): Promise<IUser[]>
  findByEmail(email: string): Promise<IUser | null>
  create(data: ICreateUserDTO): Promise<IUser>
  findById(id: string): Promise<IUser | null>
}

export { IUsersRepository }
