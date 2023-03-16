import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { RefreshTokenUseCase } from './RefreshTokenUseCase'

export class RefreshTokenController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { body } = request

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)
    const token = await refreshTokenUseCase.execute(body)

    return response.status(200).json(token)
  }
}
