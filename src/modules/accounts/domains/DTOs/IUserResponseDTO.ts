import { IRole } from '../models/IUser'

interface IUserResponseDTO {
  id: string
  name: string
  email: string
  roles: IRole[]

  authentication?: {
    refresh_token: string
    token: string
  }

  updated_at: Date
  created_at: Date
}

export { IUserResponseDTO }
