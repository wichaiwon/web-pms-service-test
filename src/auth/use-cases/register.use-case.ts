import { Injectable, UnauthorizedException, BadRequestException, Inject } from '@nestjs/common'
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

  async execute(registerDto: RegisterDto | RegisterDto[]): Promise<Users | Users[]> {
    // Handle both single and bulk registration
    if (Array.isArray(registerDto)) {
      return this.bulkRegister(registerDto)
    } else {
      return this.singleRegister(registerDto)
    }
  }

  private async singleRegister(registerDto: RegisterDto): Promise<Users> {
    // 1. Check if user already exists
    const existingUser = await this.userRepository.findByMiraiId(registerDto.mirai_id)

    if (existingUser) {
      throw new BadRequestException({
        message: 'User registration failed',
        errors: [{
          field: 'mirai_id',
          message: `User with mirai_id '${registerDto.mirai_id}' already exists`,
          constraint: 'unique',
          value: registerDto.mirai_id,
        }],
      })
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
    }

    // 4. Create user
    const result = await this.userRepository.create(userData)
    return Array.isArray(result) ? result[0] : result
  }

  private async bulkRegister(registerDtos: RegisterDto[]): Promise<Users[]> {
    try {
      // 1. Check for duplicate mirai_id within the request
      const miraiIds = registerDtos.map(user => user.mirai_id)
      const uniqueMiraiIds = new Set(miraiIds)
      if (uniqueMiraiIds.size !== miraiIds.length) {
        // Find duplicates
        const duplicates = miraiIds.filter((id, index) => miraiIds.indexOf(id) !== index)
        throw new BadRequestException({
          message: 'Bulk registration failed - duplicate mirai_id in request',
          errors: duplicates.map(id => ({
            field: 'mirai_id',
            message: `Duplicate mirai_id '${id}' found in the request`,
            constraint: 'unique',
            value: id,
          })),
        })
      }

      // 2. Check if any users already exist in database
      const existingUsers = await Promise.all(
        miraiIds.map(miraiId => this.userRepository.findByMiraiId(miraiId))
      )
      
      const existingMiraiIds = existingUsers
        .filter(user => user !== null)
        .map(user => user!.mirai_id)

      if (existingMiraiIds.length > 0) {
        throw new BadRequestException({
          message: 'Bulk registration failed - users already exist',
          errors: existingMiraiIds.map(id => ({
            field: 'mirai_id',
            message: `User with mirai_id '${id}' already exists`,
            constraint: 'unique',
            value: id,
          })),
        })
      }

      // 3. Hash passwords for all users
      const usersWithHashedPasswords = await Promise.all(
        registerDtos.map(async (user) => {
          const hashedPassword = await this.passwordHasher.hash(user.password)
          return {
            ...user,
            password: hashedPassword,
            is_active: true,
            created_by: 'admin',
          }
        })
      )

      // 4. Create users (bulk insert)
      const result = await this.userRepository.create(usersWithHashedPasswords)
      return Array.isArray(result) ? result : [result]
    } catch (error) {
      console.error('Error in bulkRegister:', error)
      throw error
    }
  }
}
