import { prismaClient } from '@infra/prisma/prismaClient'
import { ICreateUserDTO } from '@modules/accounts/domains/DTOs/ICreateUserDTO'
import { IUser } from '@modules/accounts/domains/models/IUser'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { User } from '@modules/accounts/entities/Users'

class UsersRepository implements IUsersRepository {
  async create ({ password, email, name }: ICreateUserDTO): Promise<IUser> {
    const user = new User()

    Object.assign(user, { password, email, name })

    return await prismaClient.users.create({ data: user })
  }

  async findByEmail (email: string): Promise<IUser | null> {
    return await prismaClient.users.findFirst({ where: { email } })
  }

  async findById (id: string): Promise<IUser | null> {
    return await prismaClient.users.findFirst({ where: { id } })
  }
}

export { UsersRepository }
