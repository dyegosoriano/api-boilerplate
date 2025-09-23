import { beforeEach, describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

import type { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { UsersRepositoryInMemory } from '@modules/accounts/infra/fakes/UsersRepositoryInMemory'

import { BcryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BcryptHashProvider'
import type { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateUserUseCase } from './CreateUserUseCase'

const userPayload = { password: 'Test12345', name: 'Dyego Soriano', email: 'test@email.com' }

let createUserUseCase: CreateUserUseCase
let userRepository: IUsersRepository
let hashProvider: IHashProvider

describe('CreateUserUseCase', () => {
  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    hashProvider = new BcryptHashProvider()

    createUserUseCase = new CreateUserUseCase(userRepository, hashProvider)
  })

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute(userPayload)
    expect(user).toHaveProperty('id')
  })

  it("should not be possible to return the user's password", async () => {
    const user = await createUserUseCase.execute(userPayload)
    expect(user).not.toHaveProperty('password')
  })

  it('should not able possible to create a new user with an email already registered', async () => {
    await createUserUseCase.execute(userPayload)
    await expect(createUserUseCase.execute(userPayload)).rejects.toEqual(new AppError('User already exists'))
  })

  it('should not be able to create a new user with an invalid email', async () => {
    const { password, name } = userPayload
    await expect(createUserUseCase.execute({ password, name, email: 'invalid.email.com' })).rejects.toThrow(ZodError)
  })

  it('should not be possible to register a user without a name', async () => {
    const { password, email } = userPayload
    await expect(createUserUseCase.execute({ password, email, name: '' })).rejects.toThrow(ZodError)
  })

  it('should not be possible to register a new user with an invalid password', async () => {
    const { name, email } = userPayload

    await expect(createUserUseCase.execute({ password: 'Test1234567890123', name, email })).rejects.toThrow(ZodError)
    await expect(createUserUseCase.execute({ password: '12345678', name, email })).rejects.toThrow(ZodError)
    await expect(createUserUseCase.execute({ password: 'Test123', name, email })).rejects.toThrow(ZodError)
  })
})
