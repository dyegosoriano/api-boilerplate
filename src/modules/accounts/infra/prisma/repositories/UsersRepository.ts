import { prisma } from '@infra/prisma/client'
import { ICreateUserDTO } from '@modules/accounts/domains/DTOs/ICreateUserDTO'
import { IUser } from '@modules/accounts/domains/models/IUser'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { User } from '@modules/accounts/entities/Users'

class UsersRepository implements IUsersRepository {
  async create({ password, email, name }: ICreateUserDTO): Promise<IUser> {
    const user = new User()

    Object.assign(user, { password, email, name })

    return await prisma.users.create({ data: user })
  }

  async findByEmail(email: string): Promise<IUser> {
    return (await prisma.users.findFirst({ where: { email } })) as IUser
  }

  async findById(id: string): Promise<IUser> {
    return (await prisma.users.findFirst({ where: { id } })) as IUser
  }
}

export { UsersRepository }
