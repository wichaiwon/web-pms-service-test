import { Injectable, Inject } from '@nestjs/common'
import { Users } from '../domain/entities/user/user.entity'
import { LoginDto } from '../application/dto/users/login.dto'
import { RegisterDto } from '../application/dto/users/register.dto'
import { LoginUseCase } from './use-cases/login.use-case'
import { RegisterUseCase } from './use-cases/register.use-case'
import { UpdatePasswordUseCase } from './use-cases/update-password.use-case'
import { GetUserUseCase } from './use-cases/get-user.use-case'
import { LoginResult } from 'src/shared/types/login'

@Injectable()
export class AuthService {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly updatePasswordUseCase: UpdatePasswordUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  async validateUser(mirai_id: string, password: string): Promise<any> {
    try {
      const result = await this.loginUseCase.execute({ mirai_id, password })
      return result.user
    } catch (error) {
      return null
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResult> {
    return this.loginUseCase.execute(loginDto)
  }

  async register(registerDto: RegisterDto | RegisterDto[]): Promise<Users | Users[]> {
    return this.registerUseCase.execute(registerDto)
  }

  async updatePassword(miraiId: string, oldPassword: string, newPassword: string): Promise<Users> {
    return this.updatePasswordUseCase.execute(miraiId, oldPassword, newPassword)
  }

  async getUserById(id: string): Promise<Users> {
    return this.getUserUseCase.execute(id)
  }
}
