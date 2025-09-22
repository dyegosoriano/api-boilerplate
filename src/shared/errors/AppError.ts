export class AppError extends Error {
  public readonly success: boolean
  public readonly message: string
  public readonly code: number

  constructor (message: string, code = 400) {
    super(message)
    this.success = false
    this.code = code
  }
}
