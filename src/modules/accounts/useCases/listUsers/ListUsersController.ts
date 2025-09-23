import type { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListUsersUseCase } from './ListUsersUseCase'

export class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { query } = request

    const lisUsersUseCase = container.resolve(ListUsersUseCase)
    const users = await lisUsersUseCase.execute(query as any)

    return response.status(200).json(users)
  }
}
