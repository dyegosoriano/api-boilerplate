// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

import { UsersRepositoryInMemory } from '@modules/accounts/infra/fakes/UsersRepositoryInMemory'
import { BcryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BcryptHashProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateUserUseCase } from './CreateUserUseCase'

describe('CreateUserUseCase', () => {
  const userPayload = { password: 'Test12345', name: 'Dyego Soriano', email: 'test@email.com' }

  const makeCreateUser = () => {
    const userRepository = new UsersRepositoryInMemory()
    const hashProvider = new BcryptHashProvider()

    const createUserUseCase = new CreateUserUseCase(userRepository, hashProvider)

    return { createUserUseCase }
  }

  it('should be able to create a new user', async () => {
    const { createUserUseCase } = makeCreateUser()
    const user = await createUserUseCase.execute(userPayload)
    expect(user).toHaveProperty('id')
  })

  it("should not be possible to return the user's password", async () => {
    const { createUserUseCase } = makeCreateUser()
    const user = await createUserUseCase.execute(userPayload)
    expect(user).not.toHaveProperty('password')
  })

  it('should not able possible to create a new user with an email already registered', async () => {
    const { createUserUseCase } = makeCreateUser()
    await createUserUseCase.execute(userPayload)

    await expect(createUserUseCase.execute(userPayload)).rejects.toEqual(new AppError('User already exists'))
  })

  it('should not be able to create a new user with an invalid email', async () => {
    const { createUserUseCase } = makeCreateUser()
    const { password, name } = userPayload

    await expect(createUserUseCase.execute({ password, name, email: 'invalid.email.com' })).rejects.toThrow(ZodError)
  })

  it('should not be possible to register a user without a name', async () => {
    const { createUserUseCase } = makeCreateUser()
    const { password, email } = userPayload

    await expect(createUserUseCase.execute({ password, email, name: '' })).rejects.toThrow(ZodError)
  })

  it('should not be possible to register a new user with an invalid password', async () => {
    const { createUserUseCase } = makeCreateUser()
    const { name, email } = userPayload

    await expect(createUserUseCase.execute({ password: 'Test1234567890123', name, email })).rejects.toThrow(ZodError)
    await expect(createUserUseCase.execute({ password: '12345678', name, email })).rejects.toThrow(ZodError)
    await expect(createUserUseCase.execute({ password: 'Test123', name, email })).rejects.toThrow(ZodError)
  })
})
