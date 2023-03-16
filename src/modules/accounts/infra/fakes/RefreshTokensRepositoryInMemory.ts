import { ICreateRefreshTokensDTO } from '@modules/accounts/domains/DTOs/ICreateRefreshTokensDTO'
import { IFindByRefreshTokensDTO } from '@modules/accounts/domains/DTOs/IFindByRefreshTokensDTO'
import { IRefreshTokensRepository } from '@modules/accounts/domains/repositories/IRefreshTokensRepository'
import { RefreshTokens } from '@modules/accounts/entities/RefreshTokens'

class RefreshTokensRepositoryInMemory implements IRefreshTokensRepository {
  private repository: RefreshTokens[] = []

  async create ({ expires_date, user_id }: ICreateRefreshTokensDTO): Promise<RefreshTokens> {
    const refreshToken = new RefreshTokens()

    Object.assign(refreshToken, { expires_date, user_id })
    this.repository.push(refreshToken)

    return refreshToken
  }

  async findByRefreshToken ({ refresh_token, user_id }: IFindByRefreshTokensDTO): Promise<RefreshTokens> {
    if (refresh_token && user_id) {
      return this.repository.find(
        refresh => refresh.refresh_token === refresh_token && refresh.user_id === user_id
      ) as RefreshTokens
    }

    return this.repository.find(refresh => refresh.refresh_token === refresh_token) as RefreshTokens
  }

  async deleteAllByUserId (user_id: string): Promise<void> {
    this.repository = this.repository.filter(refreshToken => refreshToken.user_id !== user_id)
  }

  async delete (id: string): Promise<void> {
    this.repository = this.repository.filter(refreshToken => refreshToken.id !== id)
  }
}

export { RefreshTokensRepositoryInMemory }
