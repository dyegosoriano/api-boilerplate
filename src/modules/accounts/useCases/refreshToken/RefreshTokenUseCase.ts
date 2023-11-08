import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { z } from 'zod'

import { config_auth } from '@core/config/auth'
import { IUseCase } from '@core/types/structures/IUseCase'
import { IRefreshTokensRepository } from '@modules/accounts/domains/repositories/IRefreshTokensRepository'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider'
import { AppError } from '@shared/errors/AppError'
import { errors } from '@shared/errors/constants'

const validationRefreshToken = z.object({ refresh_token: z.string().uuid(errors.id) })

type IRequest = z.infer<typeof validationRefreshToken>
type IResponse = { token: string }

@injectable()
export class RefreshTokenUseCase implements IUseCase<IResponse> {
  constructor (
    @inject('RefreshTokensRepository') private readonly refreshTokensRepository: IRefreshTokensRepository,
    @inject('UsersRepository') private readonly usersRepository: IUsersRepository,
    @inject('DateProvider') private readonly dateProvider: IDateProvider
  ) {}

  async execute (data: IRequest) {
    const valid_data = validationRefreshToken.parse(data)

    const refreshTokenAlreadyExists = await this.refreshTokensRepository.findByRefreshToken(valid_data)
    if (!refreshTokenAlreadyExists) throw new AppError('Refresh token does not exist')

    const user = await this.usersRepository.findById(refreshTokenAlreadyExists.user_id)

    const { expires_date, user_id } = refreshTokenAlreadyExists

    const dateNow = this.dateProvider.dateNow()

    const tokenExpired = this.dateProvider.compareIfAfter(dateNow, expires_date)
    if (tokenExpired) throw new AppError('Refresh token expired')

    const token = sign({ roles: user?.roles }, config_auth.auth.secret_token, {
      expiresIn: config_auth.auth.expires_in_token,
      subject: user_id
    })

    return { token }
  }
}
