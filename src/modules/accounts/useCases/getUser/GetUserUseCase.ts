import { inject, injectable } from 'tsyringe'

import { IUseCase } from '@core/types/IUseCase'
import { IUserResponseDTO } from '@modules/accounts/domains/DTOs/IUsersDTOs'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { UserMap } from '@modules/accounts/mappers/UserMap'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class GetUserUseCase implements IUseCase<IUserResponseDTO> {
  constructor (@inject('UsersRepository') private readonly usersRepository: IUsersRepository) {}

  async execute (id: string) {
    const user = await this.usersRepository.findById(id)

    if (!user) throw new AppError('User does not exists', 404)

    return UserMap.toDTO(user)
  }
}
