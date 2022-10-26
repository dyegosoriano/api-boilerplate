import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '@core/config/auth'
import { IUserResponseDTO } from '@modules/accounts/domains/DTOs/IUserResponseDTO'
import { IRefreshTokensRepository } from '@modules/accounts/domains/repositories/IRefreshTokensRepository'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { UserMap } from '@modules/accounts/mappers/UserMap'
import { validationAuthenticateUser } from '@modules/accounts/validations/validationAuthenticateUser'
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider'
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  password: string
  email: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor (
    @inject('RefreshTokensRepository') private readonly refreshTokensRepository: IRefreshTokensRepository,
    @inject('UsersRepository') private readonly usersRepository: IUsersRepository,
    @inject('HashProvider') private readonly hashProvider: IHashProvider,
    @inject('DateProvider') private readonly dateProvider: IDateProvider
  ) {}

  async execute ({ password, email }: IRequest): Promise<IUserResponseDTO> {
    await validationAuthenticateUser.validate({ password, email })

    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new AppError('User or password does not match')

    const passwordMatched = await this.hashProvider.compareHash(password, user.password)
    if (!passwordMatched) throw new AppError('User or password does not match')

    await this.refreshTokensRepository.deleteAllByUserId(user.id)

    const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    const { refresh_token } = await this.refreshTokensRepository.create({ user_id: user.id, expires_date })

    const token = sign({ roles: user.roles }, auth.secret_token, {
      expiresIn: auth.expires_in_token,
      subject: user.id
    })

    const response = UserMap.toDTO(user)
    Object.assign(response, { authentication: { refresh_token, token } })

    return response
  }
}

export { AuthenticateUserUseCase }
