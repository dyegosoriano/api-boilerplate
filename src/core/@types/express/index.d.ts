type IRole = 'ADMIN' | 'USER'

declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      roles: IRole[]
      id: string
    }
  }
}
