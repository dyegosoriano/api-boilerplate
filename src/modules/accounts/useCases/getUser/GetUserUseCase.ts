import { inject, injectable } from 'tsyringe'

import { IUserResponseDTO } from '@modules/accounts/domains/DTOs/IUserResponseDTO'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { UserMap } from '@modules/accounts/mappers/UserMap'
import { AppError } from '@shared/errors/AppError'

@injectable()
class GetUserUseCase {
  constructor (@inject('UsersRepository') private readonly usersRepository: IUsersRepository) {}

  async execute (id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id)

    if (!user) throw new AppError('User does not exists', 404)

    return UserMap.toDTO(user)
  }
}

export { GetUserUseCase }
