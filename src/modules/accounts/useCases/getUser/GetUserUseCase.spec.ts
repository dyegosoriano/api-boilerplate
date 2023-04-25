// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest'

import { UsersRepositoryInMemory } from '@modules/accounts/infra/fakes/UsersRepositoryInMemory'
import { BcryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BcryptHashProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { GetUserUseCase } from './GetUserUseCase'

describe('GetUserUseCase', () => {
  const userPayload = { password: 'Test12345', name: 'Dyego Soriano', email: 'test@email.com' }

  const makeCreateAndGetUser = () => {
    const userRepository = new UsersRepositoryInMemory()
    const hashProvider = new BcryptHashProvider()

    const createUserUseCase = new CreateUserUseCase(userRepository, hashProvider)
    const getUserUseCase = new GetUserUseCase(userRepository)

    return { createUserUseCase, getUserUseCase }
  }

  it('should be able to find an existing user in the database', async () => {
    const { createUserUseCase, getUserUseCase } = makeCreateAndGetUser()

    const { id: userCreatedId } = await createUserUseCase.execute(userPayload)
    const { id: userFindId } = await getUserUseCase.execute(userCreatedId)

    expect(userFindId).toEqual(userCreatedId)
  })

  it("should not be possible to return the user's password", async () => {
    const { getUserUseCase, createUserUseCase } = makeCreateAndGetUser()

    const { id } = await createUserUseCase.execute(userPayload)
    const user = await getUserUseCase.execute(id)

    expect(user).not.toHaveProperty('password')
  })

  it('should return an error if the user does not exist', async () => {
    const { getUserUseCase } = makeCreateAndGetUser()

    await expect(getUserUseCase.execute('6bf2ab88-721a-4c06-aa1d-a36dc74aced3')).rejects.toEqual(
      new AppError('User does not exists', 404)
    )
  })
})
