import { inject, injectable } from 'tsyringe'

import { IUseCase } from '@core/infra/IUseCase'
import { ICreateUserDTO } from '@modules/accounts/domains/DTOs/ICreateUserDTO'
import { IUserResponseDTO } from '@modules/accounts/domains/DTOs/IUserResponseDTO'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { UserMap } from '@modules/accounts/mappers/UserMap'
import { validationCreateUser } from '@modules/accounts/validations/validationCreateUser'
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateUserUseCase implements IUseCase<IUserResponseDTO> {
  constructor (
    @inject('UsersRepository') private readonly usersRepository: IUsersRepository,
    @inject('HashProvider') private readonly hashProvider: IHashProvider
  ) {}

  async execute (data: ICreateUserDTO) {
    const valid_data = validationCreateUser.parse(data)

    const userAlreadyExists = await this.usersRepository.findByEmail(valid_data.email)
    if (userAlreadyExists) throw new AppError('User already exists')

    const hashedPassword = await this.hashProvider.generateHash(valid_data.password)

    const user = await this.usersRepository.create({ ...valid_data, password: hashedPassword })

    return UserMap.toDTO(user)
  }
}

export { CreateUserUseCase }
