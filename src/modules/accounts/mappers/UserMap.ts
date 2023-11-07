import { IUserResponseDTO } from '../domains/DTOs/IUserResponseDTO'
import { User } from '../entities/User'

export class UserMap {
  static toDTO ({ created_at, updated_at, roles, email, name, id }: User): IUserResponseDTO {
    const user = { id, name, email, roles, updated_at, created_at }

    return user
  }
}
