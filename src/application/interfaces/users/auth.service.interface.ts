export interface IAuthService {
  validateUser(mirai_id: string, password: string): Promise<any>
  login(loginDto: any): Promise<any>
  register(registerDto: any): Promise<any>
  updatePassword(miraiId: string, oldPassword: string, newPassword: string): Promise<any>
}
