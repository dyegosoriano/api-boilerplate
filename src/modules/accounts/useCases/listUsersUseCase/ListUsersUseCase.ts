import { inject, injectable } from 'tsyringe'

import { IFindAllUsersDTO } from '@modules/accounts/domains/DTOs/IFindAllUsersDTO'
import { IUserResponseDTO } from '@modules/accounts/domains/DTOs/IUserResponseDTO'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { UserMap } from '@modules/accounts/mappers/UserMap'

@injectable()
class ListUsersUseCase {
  constructor (@inject('UsersRepository') private readonly usersRepository: IUsersRepository) {}

  async execute ({ page_size, page, email, name }: IFindAllUsersDTO): Promise<IUserResponseDTO[]> {
    const users = await this.usersRepository.findAll({ page_size, page, email, name })

    return users.map(user => UserMap.toDTO(user))
  }
}

export { ListUsersUseCase }
