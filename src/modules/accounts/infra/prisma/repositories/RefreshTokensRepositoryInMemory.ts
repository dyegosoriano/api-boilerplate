import { prismaClient } from '@infra/prisma/prismaClient'
import { ICreateRefreshTokensDTO } from '@modules/accounts/domains/DTOs/ICreateRefreshTokensDTO'
import { IFindByRefreshTokensDTO } from '@modules/accounts/domains/DTOs/IFindByRefreshTokensDTO'
import { IRefreshTokensRepository } from '@modules/accounts/domains/repositories/IRefreshTokensRepository'
import { RefreshTokens } from '@modules/accounts/entities/RefreshTokens'

class RefreshTokensRepository implements IRefreshTokensRepository {
  async create ({ expires_date, user_id }: ICreateRefreshTokensDTO): Promise<RefreshTokens> {
    const refreshToken = new RefreshTokens()

    Object.assign(refreshToken, { expires_date, user_id })

    return await prismaClient.refreshTokens.create({ data: refreshToken })
  }

  async findByRefreshToken ({ refresh_token, user_id }: IFindByRefreshTokensDTO): Promise<RefreshTokens> {
    return await prismaClient.refreshTokens.findFirst({ where: { refresh_token, user_id } }) as RefreshTokens
  }

  async deleteAllByUserId (user_id: string): Promise<void> {
    await prismaClient.refreshTokens.deleteMany({ where: { user_id } })
  }

  async delete (id: string): Promise<void> {
    await prismaClient.refreshTokens.delete({ where: { id } })
  }
}

export { RefreshTokensRepository }
