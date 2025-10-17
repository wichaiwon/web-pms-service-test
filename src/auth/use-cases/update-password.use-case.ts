import { Injectable, UnauthorizedException, Inject } from '@nestjs/common'
import { Users } from '../../domain/entities/user/user.entity'
import type { IUserRepository } from '../../domain/repositories/user/user.repository.interface'
import type { IPasswordHasher } from '../../infrastructure/services/password-hasher.service'

@Injectable()
export class UpdatePasswordUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(miraiId: string, oldPassword: string, newPassword: string): Promise<Users> {
    // 1. Find user
    const user = await this.userRepository.findByMiraiId(miraiId)

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    // 2. Validate old password
    const isOldPasswordValid = await this.passwordHasher.compare(oldPassword, user.password)
    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Old password is incorrect')
    }

    // 3. Hash new password
    const hashedNewPassword = await this.passwordHasher.hash(newPassword)

    // 4. Update user password with audit fields
    user.password = hashedNewPassword
    user.password_updated_at = new Date()
    user.updated_by = 'admin'

    // 5. Save updated user
    return this.userRepository.save(user)
  }
}
