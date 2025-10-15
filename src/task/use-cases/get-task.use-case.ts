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
    const task = await this.taskRepository.getTaskById(id)
    
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }

    return task
  }

  async executeAll(): Promise<Tasks[]> {
    return this.taskRepository.getTasks()
  }

  async executeByCustomerId(customerId: string): Promise<Tasks[]> {
    if (!customerId) {
      throw new Error('Customer ID is required')
    }
    return this.taskRepository.getTaskByCustomerId(customerId)
  }

  async executeByResponsible(userId: string): Promise<Tasks[]> {
    if (!userId) {
      throw new Error('User ID is required')
    }
    return this.taskRepository.getTaskByResponsible(userId)
  }

  async executeByStatus(status: string): Promise<Tasks[]> {
    if (!status) {
      throw new Error('Status is required')
    }
    return this.taskRepository.getTaskByStatus(status)
  }
}