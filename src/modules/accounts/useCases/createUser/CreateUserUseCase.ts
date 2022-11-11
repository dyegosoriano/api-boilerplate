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

  async execute ({ password, email, name }: ICreateUserDTO) {
    await validationCreateUser.validate({ password, email, name })

    const userAlreadyExists = await this.usersRepository.findByEmail(email)
    if (userAlreadyExists) throw new AppError('User already exists')

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({ password: hashedPassword, email, name })

    return UserMap.toDTO(user)
  }
}

export { CreateUserUseCase }
