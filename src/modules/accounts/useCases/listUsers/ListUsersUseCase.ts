import { inject, injectable } from 'tsyringe'

import { IResultList } from '@core/types/IResultList'
import { IUseCase } from '@core/types/IUseCase'
import { IFindAllUsersDTO } from '@modules/accounts/domains/DTOs/IFindAllUsersDTO'
import { IUserResponseDTO } from '@modules/accounts/domains/DTOs/IUserResponseDTO'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { UserMap } from '@modules/accounts/mappers/UserMap'

@injectable()
export class ListUsersUseCase implements IUseCase<IResultList<IUserResponseDTO>> {
  constructor (@inject('UsersRepository') private readonly usersRepository: IUsersRepository) {}

  async execute ({ page_size = 10, page = 1, email, name }: IFindAllUsersDTO) {
    const { total_users, users } = await this.usersRepository.findAll({ page_size, page, email, name })

    return {
      total_pages: Math.floor(total_users / page_size),
      total: total_users,
      page_size: +page_size,
      page: +page,
      results: users.map(user => UserMap.toDTO(user))
    }
  }
}
