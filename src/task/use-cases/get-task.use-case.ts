import { Injectable, Inject } from '@nestjs/common'
import { Tasks } from '../../domain/entities/task/task.entity'
import type { ITaskRepository } from '../../domain/repositories/task/task.repository.interface'

@Injectable()
export class GetTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(id: string): Promise<Tasks> {
    const task = await this.taskRepository.findById(id)
    
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }

    return task
  }

  async executeAll(): Promise<Tasks[]> {
    return this.taskRepository.findAll()
  }

  async executeByCustomerId(customerId: string): Promise<Tasks[]> {
    if (!customerId) {
      throw new Error('Customer ID is required')
    }
    return this.taskRepository.findByCustomerId(customerId)
  }

  async executeByResponsible(userId: string): Promise<Tasks[]> {
    if (!userId) {
      throw new Error('User ID is required')
    }
    return this.taskRepository.findByResponsible(userId)
  }

  async executeByStatus(status: string): Promise<Tasks[]> {
    if (!status) {
      throw new Error('Status is required')
    }
    return this.taskRepository.findByStatus(status)
  }
}