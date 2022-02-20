import { ICreateUserDTO } from '../DTOs/ICreateUserDTO'
import { IUser } from '../models/IUser'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUser>
  findByEmail(email: string): Promise<IUser | null>
  findById(id: string): Promise<IUser | null>
}

export { IUsersRepository }
