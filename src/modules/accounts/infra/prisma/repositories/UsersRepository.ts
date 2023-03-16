import { prisma } from '@infra/prisma/client'
import { ICreateUserDTO } from '@modules/accounts/domains/DTOs/ICreateUserDTO'
import { IUser } from '@modules/accounts/domains/models/IUser'
import { IFindAllUsersDTO } from '@modules/accounts/domains/DTOs/IFindAllUsersDTO'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { User } from '@modules/accounts/entities/Users'
import { IFindAllUsersResultDTO } from '@modules/accounts/domains/DTOs/IFindAllUsersResultDTO'

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

  async findAll({ page_size = 10, page = 1, email, name }: IFindAllUsersDTO): Promise<IFindAllUsersResultDTO> {
    const where = {}

    if (!!email) Object.assign(where, { email: { contains: email, mode: 'insensitive' } })
    if (!!name) Object.assign(where, { name: { contains: name, mode: 'insensitive' } })

    const [total_users, users] = await prisma.$transaction([
      prisma.users.count({ where }),
      prisma.users.findMany({
        skip: +page === 0 || +page === 1 ? 0 : page * page_size,
        orderBy: { created_at: 'asc' },
        take: +page_size,
        where
      })
    ])

    return { total_users, users }
  }
}

export { UsersRepository }
