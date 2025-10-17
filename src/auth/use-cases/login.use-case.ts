import { Injectable, UnauthorizedException, Inject } from '@nestjs/common'
import type { IUserRepository } from '../../domain/repositories/user/user.repository.interface'
import { LoginDto } from '../../application/dto/users/login.dto'
import type { IJwtTokenService } from '../../infrastructure/services/jwt-token.service'
import type { IPasswordHasher } from '../../infrastructure/services/password-hasher.service'
import { LoginResult } from 'src/shared/types/login'

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IJwtTokenService')
    private readonly jwtService: IJwtTokenService,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(loginDto: LoginDto): Promise<LoginResult> {
    // 1. Find user by mirai_id
    const user = await this.userRepository.findByMiraiId(loginDto.mirai_id)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // 2. Validate business rules
    if (!user.is_active) {
      throw new UnauthorizedException('User account is not active')
    }

    // 3. Verify password
    const isPasswordValid = await this.passwordHasher.compare(loginDto.password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // 4. Generate JWT token
    const payload = {
      sub: user.id,
      mirai_id: user.mirai_id,
      role: user.role,
    }

    // 5. Return success response
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
}
