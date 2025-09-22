import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { AppError } from '@shared/errors/AppError'

export default {
  notFound (_req: Request, _res: Response, _next: NextFunction) {
    throw new AppError('Not found', 404)
  },

  globalErrors (error: Error, _req: Request, res: Response, _next: NextFunction) {
    if (error instanceof AppError) return res.status(error.code).json(error)

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: {
          errors: error.issues.map(issue => issue.message),
          path: error?.errors.map(error => error.path)
        }
      })
    }

    if (error instanceof PrismaClientKnownRequestError || error?.name === 'PrismaClientKnownRequestError') {
      const { code, meta } = error as PrismaClientKnownRequestError

      let message = 'data manipulation error'
      let database_error = 'error'
      let statusCode = 400

      const { target } = meta as { target: string[] }

      switch (code) {
        case 'P2002': // Unique Constraint
          message = `Os dados para: ${target.join(',')} já foram registrados`
          database_error = 'unique_constraint_error'
          statusCode = 400
          break

        case 'P2003': // Foreign key not found
          message = 'Os dados de relacionamentos informados, não foram localizados'
          database_error = 'relation_entity_not_found'
          statusCode = 404
          break

        case 'P2025': // Not found
          database_error = 'resource_not_found'
          message = 'Dados não localizados'
          statusCode = 404
          break

        default:
          break
      }

      return res.status(statusCode).json({
        statusCode: 400,
        success: false,
        database_error,
        message
      })
    }

    // TODO: implementar método para salvar os logs de erros em um banco de dados.
    console.log(error.stack)

    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}
