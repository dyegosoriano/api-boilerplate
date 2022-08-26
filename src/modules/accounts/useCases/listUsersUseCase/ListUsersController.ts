import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IFindAllUsersDTO } from '@modules/accounts/domains/DTOs/IFindAllUsersDTO'

import { ListUsersUseCase } from './ListUsersUseCase'

export class ListUsersController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { page_size, page, email, name } = request.query as IFindAllUsersDTO

    const lisUsersUseCase = container.resolve(ListUsersUseCase)
    const users = await lisUsersUseCase.execute({ page_size, page, email, name })

    return response.status(200).json(users)
  }
}
