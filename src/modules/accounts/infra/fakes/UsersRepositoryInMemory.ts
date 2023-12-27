import { IFindAllResults } from '@core/types/utils/IFindAllResults'
import { ICreateUserDTO, IFindAllUsersDTO } from '@modules/accounts/domains/DTOs/IUsersDTOs'
import { IUser } from '@modules/accounts/domains/models/IUser'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { User } from '@modules/accounts/entities/User'
import { paginateArray } from '@shared/utils'

export class UsersRepositoryInMemory implements IUsersRepository {
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

  async findAll ({ page_size = 10, page = 1, email, name }: IFindAllUsersDTO): Promise<IFindAllResults<IUser>> {
    let repoClone = this.repository

    if (email) repoClone = repoClone.filter(item => item.email.toUpperCase().includes(email.toUpperCase()))
    if (name) repoClone = repoClone.filter(item => item.name.toUpperCase().includes(name.toUpperCase()))

    if (page_size && page) repoClone = paginateArray({ array: repoClone, page, page_size })

    return { total: repoClone.length + 1, results: repoClone }
  }
}
