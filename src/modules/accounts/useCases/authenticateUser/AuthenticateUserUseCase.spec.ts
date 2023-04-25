// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest'
import { ValidationError } from 'yup'

import { RefreshTokensRepositoryInMemory } from '@modules/accounts/infra/fakes/RefreshTokensRepositoryInMemory'
import { UsersRepositoryInMemory } from '@modules/accounts/infra/fakes/UsersRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { BcryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BcryptHashProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

const createUserPayload = { password: 'Test12345', name: 'Dyego Soriano', email: 'test@email.com' }
const loginUserPayload = { password: 'Test12345', email: 'test@email.com' }

describe('AuthenticateUserUseCase', () => {
  const makeCreateUser = () => {
    const refreshTokensRepository = new RefreshTokensRepositoryInMemory()
    const userRepository = new UsersRepositoryInMemory()
    const hashProvider = new BcryptHashProvider()
    const dateProvider = new DayjsDateProvider()

    const authenticateUserUseCase = new AuthenticateUserUseCase(
      refreshTokensRepository,
      userRepository,
      hashProvider,
      dateProvider
    )
    const createUserUseCase = new CreateUserUseCase(userRepository, hashProvider)

    return { authenticateUserUseCase, createUserUseCase }
  }

  it('should be able to authenticate a user', async () => {
    const { authenticateUserUseCase, createUserUseCase } = makeCreateUser()

    await createUserUseCase.execute(createUserPayload)
    const user = await authenticateUserUseCase.execute(loginUserPayload)

    expect(user.authentication).toHaveProperty('refresh_token')
    expect(user.authentication).toHaveProperty('token')
    expect(user).not.toHaveProperty('password')
  })

  it('must not be able to authenticate a user with non-existent email or invalid password', async () => {
    const { authenticateUserUseCase, createUserUseCase } = makeCreateUser()

    await createUserUseCase.execute(createUserPayload)

    await expect(authenticateUserUseCase.execute({ ...loginUserPayload, email: 'invalid@email.com' })).rejects.toEqual(
      new AppError('User or password does not match')
    )

    await expect(authenticateUserUseCase.execute({ ...loginUserPayload, password: 'invalidPass123' })).rejects.toEqual(
      new AppError('User or password does not match')
    )

    await expect(authenticateUserUseCase.execute({ ...loginUserPayload, password: 'invalidPass' })).rejects.toEqual(
      new ValidationError('Password must contain at least one number or letter')
    )
  })
})
