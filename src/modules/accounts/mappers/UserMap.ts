import { IUserResponseDTO } from '../domains/DTOs/IUserResponseDTO'
import { User } from '../entities/Users'

class UserMap {
  static toDTO ({ created_at, updated_at, email, name, id }: User): IUserResponseDTO {
    const user = { id, name, email, updated_at, created_at }

    return user
  }
}

export { UserMap }
