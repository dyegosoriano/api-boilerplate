type IRole = 'ADMIN' | 'USER'

interface IUser {
  id: string

  password: string
  roles: IRole[]
  email: string
  name: string

  updated_at: Date
  created_at: Date
}

export { IUser, IRole }
