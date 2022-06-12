import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'

import { AppError } from '@shared/errors/AppError'

export default {
  notFound (_req: Request, _res: Response, _next: NextFunction) {
    throw new AppError('Not found', 404)
  },

  globalErrors (err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: 'error',
        message: err.message
      })
    }

    if (err instanceof ValidationError) {
      return res.status(400).json({
        status: 'error',
        message: {
          errors: err.message,
          path: err.path
        }
      })
    }

    console.log(err.stack)

    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}
