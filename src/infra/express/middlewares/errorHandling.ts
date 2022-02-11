import { NextFunction, Request, Response } from 'express'

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

    console.log(`error.message >>> ${err.message} <<<`)

    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}
