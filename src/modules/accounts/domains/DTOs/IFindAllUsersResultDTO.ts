import { IUser } from '../models/IUser'

export interface IFindAllUsersResultDTO {
  total_users: number
  users: IUser[]
}
