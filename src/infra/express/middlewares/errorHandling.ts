import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

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

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 'error',
        message: {
          errors: err.issues.map((issue) => issue.message),
          path: err?.errors.map((error) => error.path[0])
        }
      })
    }

    console.log(err.stack)

    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}
