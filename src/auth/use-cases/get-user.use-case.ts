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
    if (!id) {
      throw new NotFoundException({
        message: 'User retrieval failed',
        errors: [{
          field: 'id',
          message: 'User ID is required',
          constraint: 'required',
        }],
      })
    }

    const user = await this.userRepository.findById(id)
    
    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        errors: [{
          field: 'id',
          message: `User with id '${id}' does not exist`,
          constraint: 'not_found',
          value: id,
        }],
      })
    }

    // Remove password from response for security
    const { password, ...userWithoutPassword } = user
    
    return userWithoutPassword as Users
  }
}
