import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '@core/config/auth'
import { IUseCase } from '@core/infra/IUseCase'
import { IRefreshTokensRepository } from '@modules/accounts/domains/repositories/IRefreshTokensRepository'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  refresh_token: string
}

interface IResponse {
  token: string
}

@injectable()
class RefreshTokenUseCase implements IUseCase<IResponse> {
  constructor (
    @inject('RefreshTokensRepository') private readonly refreshTokensRepository: IRefreshTokensRepository,
    @inject('UsersRepository') private readonly usersRepository: IUsersRepository,
    @inject('DateProvider') private readonly dateProvider: IDateProvider
  ) {}

  async execute ({ refresh_token }: IRequest) {
    if (!refresh_token) throw new AppError('Refresh token is required')

    const refreshTokenAlreadyExists = await this.refreshTokensRepository.findByRefreshToken({ refresh_token })
    if (!refreshTokenAlreadyExists) throw new AppError('Refresh token does not exist')

    const user = await this.usersRepository.findById(refreshTokenAlreadyExists.user_id)

    const { expires_date, user_id } = refreshTokenAlreadyExists

    const dateNow = this.dateProvider.dateNow()

    const tokenExpired = this.dateProvider.compareIfAfter(dateNow, expires_date)
    if (tokenExpired) throw new AppError('Refresh token expired')

    const token = sign({ roles: user?.roles }, auth.secret_token, {
      expiresIn: auth.expires_in_token,
      subject: user_id
    })

    return { token }
  }
}

export { RefreshTokenUseCase }
