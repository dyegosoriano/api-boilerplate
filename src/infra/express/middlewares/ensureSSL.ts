import type { NextFunction, Request, Response } from 'express'

export const ensureSSL = (request: Request, response: Response, next: NextFunction) => {
  const forwardedProtocol = request.headers['x-forwarded-proto']

  if (forwardedProtocol !== 'https') {
    return response.status(403).json({ message: 'SSL required' })
  }

  next()
}
