import { ICreateUserDTO } from '@modules/accounts/domains/DTOs/ICreateUserDTO'
import { IUser } from '@modules/accounts/domains/models/IUser'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { User } from '@modules/accounts/entities/Users'

class UsersRepositoryInMemory implements IUsersRepository {
  private repository: IUser[] = []

  async create ({ password, email, name }: ICreateUserDTO): Promise<IUser> {
    const user = new User()
    Object.assign(user, { password, email, name })
    this.repository.push(user)

    return user
  }

  async findByEmail (email: string): Promise<User> {
    return this.repository.find(user => user.email === email) as IUser
  }

  async findById (id: string): Promise<IUser> {
    return this.repository.find(user => user.id === id) as IUser
  }
}

export { UsersRepositoryInMemory }
