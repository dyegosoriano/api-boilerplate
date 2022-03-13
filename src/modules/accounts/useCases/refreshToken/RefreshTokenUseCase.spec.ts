import { RefreshTokensRepositoryInMemory } from '@modules/accounts/infra/fakes/repositories/RefreshTokensRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { AppError } from '@shared/errors/AppError'

import { RefreshTokenUseCase } from './RefreshTokenUseCase'

describe('RefreshTokenUseCase', () => {
  const makeRefreshToken = () => {
    const refreshTokensRepositoryInMemory = new RefreshTokensRepositoryInMemory()
    const dateProvider = new DayjsDateProvider()

    const refreshTokenUseCase = new RefreshTokenUseCase(refreshTokensRepositoryInMemory, dateProvider)

    return { refreshTokensRepositoryInMemory, refreshTokenUseCase, dateProvider }
  }

  it('should be able to refresh a token', async () => {
    const { refreshTokensRepositoryInMemory, refreshTokenUseCase, dateProvider } = makeRefreshToken()
    const expires_date = dateProvider.addDays(1)

    const { refresh_token } = await refreshTokensRepositoryInMemory.create({ expires_date, user_id: '1' })

    await expect(refreshTokenUseCase.execute({ refresh_token })).resolves.toHaveProperty('token')
  })

  it('should not be able to refresh a token with invalid refresh token', async () => {
    const { refreshTokenUseCase } = makeRefreshToken()

    await expect(refreshTokenUseCase.execute({ refresh_token: 'invalid_refresh_token' }))
      .rejects.toEqual(new AppError('Refresh token does not exist'))
  })
})
