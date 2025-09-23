import type { RefreshTokens } from '@modules/accounts/entities/RefreshToken'

import type { ICreateRefreshTokensDTO, IFindByRefreshTokensDTO } from '../DTOs/IRefreshTokensDTOs'

export interface IRefreshTokensRepository {
  findByRefreshToken({ refresh_token, user_id }: IFindByRefreshTokensDTO): Promise<RefreshTokens>
  create({ expires_date, user_id }: ICreateRefreshTokensDTO): Promise<RefreshTokens>
  deleteAllByUserId(user_id: string): Promise<void>
  delete(id: string): Promise<void>
}
