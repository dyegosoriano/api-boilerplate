// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeAll, describe, expect, it } from 'vitest'

import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { UsersRepositoryInMemory } from '@modules/accounts/infra/fakes/UsersRepositoryInMemory'
import { BcryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BcryptHashProvider'
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { GetUserUseCase } from './GetUserUseCase'

const userPayload = { password: 'Test12345', name: 'Dyego Soriano', email: 'test@email.com' }

let createUserUseCase: CreateUserUseCase
let userRepository: IUsersRepository
let getUserUseCase: GetUserUseCase
let hashProvider: IHashProvider
let user_id: string

describe('GetUserUseCase', () => {
  beforeAll(async () => {
    userRepository = new UsersRepositoryInMemory()
    hashProvider = new BcryptHashProvider()

    createUserUseCase = new CreateUserUseCase(userRepository, hashProvider)
    getUserUseCase = new GetUserUseCase(userRepository)

    const { id } = await createUserUseCase.execute(userPayload)
    user_id = id
  })

  it('should be able to find an existing user in the database', async () => {
    const { id: userFindId } = await getUserUseCase.execute({ id: user_id })
    expect(userFindId).toEqual(user_id)
  })

  it("should not be possible to return the user's password", async () => {
    const user = await getUserUseCase.execute({ id: user_id })
    expect(user).not.toHaveProperty('password')
  })

  it('should return an error if the user does not exist', async () => {
    await expect(getUserUseCase.execute({ id: '6bf2ab88-721a-4c06-aa1d-a36dc74aced3' })).rejects.toEqual(
      new AppError('User does not exists', 404)
    )
  })
})
