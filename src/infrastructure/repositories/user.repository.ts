import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Users } from '../../domain/entities/user/user.entity'
import { IUserRepository } from '../../domain/repositories/user/user.repository.interface'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findByMiraiId(mirai_id: string): Promise<Users | null> {
    return this.userRepository.findOne({ where: { mirai_id } })
  }

  async findById(id: string): Promise<Users | null> {
    return this.userRepository.findOne({ where: { id } })
  }

  async create(userData: Partial<Users>): Promise<Users> {
    const user = this.userRepository.create(userData)
    return this.userRepository.save(user)
  }

  async save(user: Users): Promise<Users> {
    return this.userRepository.save(user)
  }

  async findAll(): Promise<Users[]> {
    return this.userRepository.find()
  }

  async update(id: string, userData: Partial<Users>): Promise<Users> {
    await this.userRepository.update(id, userData)
    const updatedUser = await this.findById(id)
    if (!updatedUser) {
      throw new Error(`User with id ${id} not found after update.`)
    }
    return updatedUser
  }
}
