import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { UsersRepositoryInMemory } from '@modules/accounts/infra/fakes/repositories/UsersRepositoryInMemory'
import { BcryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BcryptHashProvider'
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateUserUseCase } from './CreateUserUseCase'

const userPayload = { password: 'test123', name: 'Dyego Soriano', email: 'test@email.com' }

let createUserUseCase: CreateUserUseCase
let userRepository: IUsersRepository
let hashProvider: IHashProvider

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory()
    hashProvider = new BcryptHashProvider()
    createUserUseCase = new CreateUserUseCase(userRepository, hashProvider)
  })

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute(userPayload)
    expect(user).toHaveProperty('id')
  })

  it('should not able possible to create a new user with an email already registered', async () => {
    await createUserUseCase.execute(userPayload)
    await expect(createUserUseCase.execute(userPayload)).rejects.toEqual(new AppError('User already exists'))
  })
})
