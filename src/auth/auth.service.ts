import { Injectable, UnauthorizedException, Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { Users } from '../domain/entities/user/user.entity'
import type { IUserRepository } from '../domain/repositories/user.repository.interface'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  // ...existing code...
  async validateUser(mirai_id: string, password: string): Promise<any> {
    const user = await this.userRepository.findByMiraiId(mirai_id)

    if (user && user.is_active && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.mirai_id, loginDto.password)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = {
      sub: user.id,
      mirai_id: user.mirai_id,
      role: user.role,
    }

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        mirai_id: user.mirai_id,
        role: user.role,
        branch: user.branch,
      },
    }
  }

  async register(registerDto: RegisterDto): Promise<Users> {
    const existingUser = await this.userRepository.findByMiraiId(registerDto.mirai_id)

    if (existingUser) {
      throw new UnauthorizedException('User already exists')
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10)

    const userData = {
      ...registerDto,
      password: hashedPassword,
      is_active: true,
      pin_code: registerDto.pin_code,
      created_by: 'system',
      password_updated_at: new Date(),
    }

    return this.userRepository.create(userData)
  }
}
