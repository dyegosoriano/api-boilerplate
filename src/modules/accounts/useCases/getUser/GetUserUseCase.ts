import { inject, injectable } from 'tsyringe'
import { z } from 'zod'

import type { IUserResponseDTO } from '@modules/accounts/domains/DTOs/IUsersDTOs'
import type { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { UserMap } from '@modules/accounts/mappers/UserMap'

import { AppError } from '@shared/errors/AppError'
import { errors } from '@shared/errors/constants'

import type { IUseCase } from '@core/types/structures/IUseCase'

const validationId = z.object({ id: z.string().uuid(errors.id) })

type IRequest = z.infer<typeof validationId>

@injectable()
export class GetUserUseCase implements IUseCase<IUserResponseDTO> {
  constructor(@inject('UsersRepository') private readonly usersRepository: IUsersRepository) {}

  async execute(data: IRequest) {
    const valid_data = validationId.parse(data)

    const user = await this.usersRepository.findById(valid_data.id)

    if (!user) throw new AppError('User does not exists', 404)

    return UserMap.toDTO(user)
  }
}
