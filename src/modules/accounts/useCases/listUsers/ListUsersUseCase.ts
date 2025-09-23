import { inject, injectable } from 'tsyringe'

import type { IFindAllUsersDTO, IUserResponseDTO } from '@modules/accounts/domains/DTOs/IUsersDTOs'
import type { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { UserMap } from '@modules/accounts/mappers/UserMap'
import { validationListUsers } from '@modules/accounts/validations/validationsUsers'

import type { IUseCase } from '@core/types/structures/IUseCase'
import type { IResultList } from '@core/types/utils/IResultList'

@injectable()
export class ListUsersUseCase implements IUseCase<IResultList<IUserResponseDTO>> {
  constructor(@inject('UsersRepository') private readonly usersRepository: IUsersRepository) {}

  async execute(data: IFindAllUsersDTO) {
    const valid_data = validationListUsers.parse(data)

    const { total, results } = await this.usersRepository.findAll(valid_data)

    return {
      total_pages: Math.ceil(total / valid_data.page_size),
      total: total,
      page_size: +valid_data.page_size,
      page: +valid_data.page,
      results: results.map(user => UserMap.toDTO(user))
    }
  }
}
