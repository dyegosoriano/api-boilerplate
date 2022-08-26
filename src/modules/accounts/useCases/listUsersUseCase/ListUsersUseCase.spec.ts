import { UsersRepositoryInMemory } from '@modules/accounts/infra/fakes/repositories/UsersRepositoryInMemory'
import { BcryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BcryptHashProvider'

import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { ListUsersUseCase } from './ListUsersUseCase'

const fakeUsers = [
  { name: 'dyego', email: 'dyego@email.com', password: 'Test12345' },
  { name: 'rebecca', email: 'rebecca@email.com', password: 'Test12345' },
  { name: 'bob', email: 'bob@email.com', password: 'Test12345' }
]

describe('ListUsersUseCase', () => {
  const makeUsers = () => {
    const userRepository = new UsersRepositoryInMemory()
    const hashProvider = new BcryptHashProvider()

    const createUserUseCase = new CreateUserUseCase(userRepository, hashProvider)
    const listUsersUseCase = new ListUsersUseCase(userRepository)

    async function createUsers (): Promise<void> {
      for await (const user of fakeUsers) {
        await createUserUseCase.execute(user)
      }
    }

    return { listUsersUseCase, createUsers }
  }

  it('should return a list with a maximum of five users', async () => {
    const { listUsersUseCase, createUsers } = makeUsers()

    await createUsers()

    const users = await listUsersUseCase.execute({ page_size: 2 })

    expect(users.length).toEqual(2)
  })

  it('should return a list of users that have the letters "ye" in the name', async () => {
    const { listUsersUseCase, createUsers } = makeUsers()

    await createUsers()

    const [users] = await listUsersUseCase.execute({ name: 'Ye' })

    expect(users.name).toEqual('dyego')
  })

  it('should return a list of users that have the letters "cc" in the email', async () => {
    const { listUsersUseCase, createUsers } = makeUsers()

    await createUsers()

    const [users] = await listUsersUseCase.execute({ email: 'Cc' })

    expect(users.email).toEqual('rebecca@email.com')
  })

  it("should not be possible to return the user's password", async () => {
    const { listUsersUseCase, createUsers } = makeUsers()

    await createUsers()

    const [users] = await listUsersUseCase.execute({})

    expect(users).not.toHaveProperty('password')
  })
})