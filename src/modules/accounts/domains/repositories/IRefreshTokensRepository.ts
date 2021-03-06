import { RefreshTokens } from '@modules/accounts/entities/RefreshTokens'

import { ICreateRefreshTokensDTO } from '../DTOs/ICreateRefreshTokensDTO'
import { IFindByRefreshTokensDTO } from '../DTOs/IFindByRefreshTokensDTO'

interface IRefreshTokensRepository {
  findByRefreshToken({ refresh_token, user_id }: IFindByRefreshTokensDTO): Promise<RefreshTokens>
  create({ expires_date, user_id }: ICreateRefreshTokensDTO): Promise<RefreshTokens>
  deleteAllByUserId(user_id: string): Promise<void>
  delete(id: string): Promise<void>
}

export { IRefreshTokensRepository }
