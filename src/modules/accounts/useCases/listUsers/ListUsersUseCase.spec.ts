import { beforeAll, describe, expect, it } from 'vitest'

import type { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { UsersRepositoryInMemory } from '@modules/accounts/infra/fakes/UsersRepositoryInMemory'

import { BcryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BcryptHashProvider'
import type { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider'

import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { ListUsersUseCase } from './ListUsersUseCase'

const fakeUsers = [
  { name: 'dyego', email: 'dyego@email.com', password: 'Test12345' },
  { name: 'rebecca', email: 'rebecca@email.com', password: 'Test12345' },
  { name: 'bob', email: 'bob@email.com', password: 'Test12345' }
]

let createUserUseCase: CreateUserUseCase
let listUsersUseCase: ListUsersUseCase
let userRepository: IUsersRepository
let hashProvider: IHashProvider

describe('ListUsersUseCase', () => {
  beforeAll(async () => {
    userRepository = new UsersRepositoryInMemory()
    hashProvider = new BcryptHashProvider()

    createUserUseCase = new CreateUserUseCase(userRepository, hashProvider)
    listUsersUseCase = new ListUsersUseCase(userRepository)

    for await (const user of fakeUsers) {
      await createUserUseCase.execute(user)
    }
  })

  it('should return a list with a maximum of five users', async () => {
    const response = await listUsersUseCase.execute({ page_size: 5, page: 1 })
    expect(response.results.length).toEqual(3)
  })

  it('should return a list of users that have the letters "yeg" in the name', async () => {
    const response = await listUsersUseCase.execute({ page_size: 2, page: 1, name: 'Yeg' })
    expect(response.results[0].name).toEqual('dyego')
  })

  it('should return a list of users that have the letters "rebecca@email.com" in the email', async () => {
    const response = await listUsersUseCase.execute({ page_size: 2, page: 1, email: 'rebecca@email.com' })
    expect(response.results[0].email).toEqual('rebecca@email.com')
  })

  it("should not be possible to return the user's password", async () => {
    const response = await listUsersUseCase.execute({ page_size: 2, page: 1 })
    expect(response.results[0]).not.toHaveProperty('password')
  })

  it('must return a total of 3 pages and the pagination must contain 2 items', async () => {
    const response = await listUsersUseCase.execute({ page_size: 2, page: 1 })

    expect(response.total_pages).toEqual(2)
    expect(response.total).toEqual(3)
  })
})
