interface IUser {
  id: string

  email: string
  name: string
  password: string

  updated_at: Date
  created_at: Date
}

export { IUser }
