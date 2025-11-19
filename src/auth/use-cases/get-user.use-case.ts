import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { Users } from '../../domain/entities/user/user.entity'
import type { IUserRepository } from '../../domain/repositories/user/user.repository.interface'

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<Users> {
    const user = await this.userRepository.findById(id)
    
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    // Remove password from response for security
    const { password, ...userWithoutPassword } = user
    
    return userWithoutPassword as Users
  }
}
