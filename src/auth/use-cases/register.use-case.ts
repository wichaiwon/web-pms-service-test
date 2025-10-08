import { Injectable, UnauthorizedException, Inject } from '@nestjs/common'
import { Users } from '../../domain/entities/user/user.entity'
import type { IUserRepository } from '../../domain/repositories/user/user.repository.interface'
import { RegisterDto } from '../../application/dto/users/register.dto'
import type { IPasswordHasher } from '../../infrastructure/services/password-hasher.service'

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(registerDto: RegisterDto): Promise<Users> {
    // 1. Check if user already exists
    const existingUser = await this.userRepository.findByMiraiId(registerDto.mirai_id)
    
    if (existingUser) {
      throw new UnauthorizedException('User already exists')
    }

    // 2. Hash password
    const hashedPassword = await this.passwordHasher.hash(registerDto.password)

    // 3. Prepare user data with business rules
    const userData = {
      ...registerDto,
      password: hashedPassword,
      is_active: true,
      pin_code: registerDto.pin_code,
      created_by: 'admin',
      password_updated_at: new Date(),
    }

    // 4. Create user
    return this.userRepository.create(userData)
  }
}