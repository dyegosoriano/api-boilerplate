import { IUser } from '../models/IUser'

interface IFindAllUsersResultDTO {
  total_users: number
  users: IUser[]
}

export { IFindAllUsersResultDTO }
