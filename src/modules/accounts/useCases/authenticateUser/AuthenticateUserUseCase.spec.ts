import { beforeEach, describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

import type { IRefreshTokensRepository } from '@modules/accounts/domains/repositories/IRefreshTokensRepository'
import type { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { RefreshTokensRepositoryInMemory } from '@modules/accounts/infra/fakes/RefreshTokensRepositoryInMemory'
import { UsersRepositoryInMemory } from '@modules/accounts/infra/fakes/UsersRepositoryInMemory'

import { NodeDateProvider } from '@shared/container/providers/DateProvider/implementations/NodeDateProvider'
import type { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider'
import { BcryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BcryptHashProvider'
import type { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

const createUserPayload = { password: 'Test12345', name: 'Dyego Soriano', email: 'test@email.com' }
const loginUserPayload = { password: 'Test12345', email: 'test@email.com' }

let refreshTokensRepository: IRefreshTokensRepository
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase
let userRepository: IUsersRepository
let dateProvider: IDateProvider
let hashProvider: IHashProvider

describe('AuthenticateUserUseCase', () => {
  beforeEach(async () => {
    refreshTokensRepository = new RefreshTokensRepositoryInMemory()
    userRepository = new UsersRepositoryInMemory()
    hashProvider = new BcryptHashProvider()
    dateProvider = new NodeDateProvider()

    createUserUseCase = new CreateUserUseCase(userRepository, hashProvider)
    authenticateUserUseCase = new AuthenticateUserUseCase(refreshTokensRepository, userRepository, hashProvider, dateProvider)

    await createUserUseCase.execute(createUserPayload)
  })

  it('should be able to authenticate a user', async () => {
    const user = await authenticateUserUseCase.execute(loginUserPayload)

    expect(user.authentication).toHaveProperty('refresh_token')
    expect(user.authentication).toHaveProperty('token')
    expect(user).not.toHaveProperty('password')
  })

  it('must not be able to authenticate a user with non-existent email or invalid password', async () => {
    await expect(authenticateUserUseCase.execute({ ...loginUserPayload, password: 'invalidPass' })).rejects.toThrow(ZodError)

    await expect(authenticateUserUseCase.execute({ ...loginUserPayload, email: 'invalid@email.com' })).rejects.toEqual(
      new AppError('User or password does not match')
    )

    await expect(authenticateUserUseCase.execute({ ...loginUserPayload, password: 'invalidPass123' })).rejects.toEqual(
      new AppError('User or password does not match')
    )
  })
})
