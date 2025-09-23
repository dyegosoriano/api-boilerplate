type IRole = 'ADMIN' | 'USER'

declare namespace Express {
  export interface Request {
    user: {
      roles: IRole[]
      id: string
    }
  }
}
