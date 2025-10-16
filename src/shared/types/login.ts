export type LoginResult = {
  access_token: string
  user: {
    id: string
    name: string
    surname: string
    mirai_id: string
    role: string
    branch: string
  }
}
