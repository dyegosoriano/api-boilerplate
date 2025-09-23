import { beforeAll, describe, expect, it } from 'vitest'

import type { IRefreshTokensRepository } from '@modules/accounts/domains/repositories/IRefreshTokensRepository'
import type { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { RefreshTokensRepositoryInMemory } from '@modules/accounts/infra/fakes/RefreshTokensRepositoryInMemory'
import { UsersRepositoryInMemory } from '@modules/accounts/infra/fakes/UsersRepositoryInMemory'

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import type { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider'
import { AppError } from '@shared/errors/AppError'

import { RefreshTokenUseCase } from './RefreshTokenUseCase'

let refreshTokensRepository: IRefreshTokensRepository
let refreshTokenUseCase: RefreshTokenUseCase
let userRepository: IUsersRepository
let dateProvider: IDateProvider

describe('RefreshTokenUseCase', () => {
  beforeAll(async () => {
    refreshTokensRepository = new RefreshTokensRepositoryInMemory()
    userRepository = new UsersRepositoryInMemory()
    dateProvider = new DayjsDateProvider()

    refreshTokenUseCase = new RefreshTokenUseCase(refreshTokensRepository, userRepository, dateProvider)
  })

  it('should be able to refresh a token', async () => {
    const expires_date = dateProvider.addDays(1)
    const { refresh_token } = await refreshTokensRepository.create({ expires_date, user_id: '1' })
    await expect(refreshTokenUseCase.execute({ refresh_token })).resolves.toHaveProperty('token')
  })

  it('should not be able to refresh a token with invalid refresh token', async () => {
    await expect(refreshTokenUseCase.execute({ refresh_token: 'cc9c8edf-d252-453f-b362-ae75ce1dc9cb' })).rejects.toEqual(
      new AppError('Refresh token does not exist')
    )
  })
})
