import { ICreateUserDTO, IFindAllUsersDTO, IFindAllUsersResultDTO } from '../DTOs/IUsersDTOs'
import { IUser } from '../models/IUser'

export interface IUsersRepository {
  findAll(data: IFindAllUsersDTO): Promise<IFindAllUsersResultDTO>
  findByEmail(email: string): Promise<IUser | null>
  create(data: ICreateUserDTO): Promise<IUser>
  findById(id: string): Promise<IUser | null>
}
