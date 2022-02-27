import { inject, injectable } from 'tsyringe'

import { ICreateUserDTO } from '@modules/accounts/domains/DTOs/ICreateUserDTO'
import { IUser } from '@modules/accounts/domains/models/IUser'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateUserUseCase {
  constructor (
    @inject('UsersRepository') private readonly usersRepository: IUsersRepository,
    @inject('HashProvider') private readonly hashProvider: IHashProvider
  ) {}

  async execute ({ password, email, name }: ICreateUserDTO): Promise<IUser> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)
    if (userAlreadyExists) throw new AppError('User already exists')

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({ password: hashedPassword, email, name })

    return user
  }
}

export { CreateUserUseCase }
