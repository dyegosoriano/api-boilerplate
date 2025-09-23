import { filterObject } from '@shared/utils'

import type { IUserResponseDTO } from '../domains/DTOs/IUsersDTOs'
import type { User } from '../entities/User'

export class UserMap {
  static toDTO(data: User): IUserResponseDTO {
    const user = filterObject(data, ['password'])
    return user
  }
}
