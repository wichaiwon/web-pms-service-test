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
    // 1. Validate required fields
    if (!loginDto.mirai_id || !loginDto.password) {
      const errors = [
        ...((!loginDto.mirai_id) ? [{ field: 'mirai_id', message: 'Mirai ID is required' }] : []),
        ...((!loginDto.password) ? [{ field: 'password', message: 'Password is required' }] : []),
      ]
      throw new UnauthorizedException({
        message: 'Login failed - missing credentials',
        errors,
      })
    }

    // 2. Find user by mirai_id
    const user = await this.userRepository.findByMiraiId(loginDto.mirai_id)

    if (!user) {
      throw new UnauthorizedException({
        message: 'Login failed',
        errors: [{
          field: 'mirai_id',
          message: 'Invalid mirai_id or password',
          constraint: 'authentication',
        }],
      })
    }

    // 3. Validate business rules
    if (!user.is_active) {
      throw new UnauthorizedException({
        message: 'Login failed',
        errors: [{
          field: 'mirai_id',
          message: 'User account is not active. Please contact administrator',
          constraint: 'account_status',
        }],
      })
    }

    // 4. Verify password
    const isPasswordValid = await this.passwordHasher.compare(loginDto.password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        message: 'Login failed',
        errors: [{
          field: 'password',
          message: 'Invalid mirai_id or password',
          constraint: 'authentication',
        }],
      })
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
        name: user.firstname,
        surname: user.lastname,
        mirai_id: user.mirai_id,
        role: user.role,
        branch: user.branch,
      },
    }
  }
}
