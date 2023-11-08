import { prisma } from '@infra/prisma/client'
import { ICreateRefreshTokensDTO, IFindByRefreshTokensDTO } from '@modules/accounts/domains/DTOs/IRefreshTokensDTOs'
import { IRefreshTokensRepository } from '@modules/accounts/domains/repositories/IRefreshTokensRepository'
import { RefreshTokens } from '@modules/accounts/entities/RefreshToken'

export class RefreshTokensRepository implements IRefreshTokensRepository {
  async create({ expires_date, user_id }: ICreateRefreshTokensDTO): Promise<RefreshTokens> {
    const refreshToken = new RefreshTokens()

    Object.assign(refreshToken, { expires_date, user_id })

    return await prisma.refreshTokens.create({ data: refreshToken })
  }

  async findByRefreshToken({ refresh_token, user_id }: IFindByRefreshTokensDTO): Promise<RefreshTokens> {
    return (await prisma.refreshTokens.findFirst({ where: { refresh_token, user_id } })) as RefreshTokens
  }

  async deleteAllByUserId(user_id: string): Promise<void> {
    await prisma.refreshTokens.deleteMany({ where: { user_id } })
  }

  async delete(id: string): Promise<void> {
    await prisma.refreshTokens.delete({ where: { id } })
  }
}
