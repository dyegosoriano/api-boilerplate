import { prisma } from '@infra/prisma/client'
import { ICreateUserDTO } from '@modules/accounts/domains/DTOs/ICreateUserDTO'
import { IUser } from '@modules/accounts/domains/models/IUser'
import { IFindAllUsersDTO } from '@modules/accounts/domains/DTOs/IFindAllUsersDTO'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { User } from '@modules/accounts/entities/Users'

class UsersRepository implements IUsersRepository {
  async create({ password, email, name }: ICreateUserDTO): Promise<IUser> {
    const user = new User()

    Object.assign(user, { password, email, name })

    return await prisma.users.create({ data: user })
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await prisma.users.findUnique({ where: { email } })
  }

  async findById(id: string): Promise<IUser | null> {
    return await prisma.users.findUnique({ where: { id } })
  }

  async findAll({ page_size, page = 1, email, name }: IFindAllUsersDTO): Promise<IUser[]> {
    return await prisma.users.findMany({
      where: {
        email: { contains: email, mode: 'insensitive' },
        name: { contains: name, mode: 'insensitive' }
      },
      take: !!page_size ? +page_size : 10,
      skip: page >= 1 ? page - 1 : page
    })
  }
}

export { UsersRepository }
