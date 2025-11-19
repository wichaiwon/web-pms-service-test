import { Injectable, Inject } from '@nestjs/common'
import { Tasks } from '../../domain/entities/task/task.entity'
import type { ITaskRepository } from '../../domain/repositories/task/task.repository.interface'
import type { IUserRepository } from '../../domain/repositories/user/user.repository.interface'
import { Branch } from '../../shared/enum/user'

@Injectable()
export class GetTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  private sortTasksByDateTime(tasks: Tasks[]): Tasks[] {
    const getDateTime = (task: Tasks) => {
      if (!task.date_booked || !task.time_booked) return 0
      const dateTimeString = `${task.date_booked} ${task.time_booked}`
      return new Date(dateTimeString).getTime()
    }

    return [...tasks].sort((a, b) => getDateTime(a) - getDateTime(b))
  }

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

  async executeByUserBranch(userId: string): Promise<Tasks[]> {
    if (!userId) {
      throw new Error('User ID is required')
    }
    
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error(`User with id ${userId} not found`)
    }

    // Get tasks by branch (already filtered by today's date in repository)
    const tasks = await this.taskRepository.getTasksByBranch(user.branch)
    return this.sortTasksByDateTime(tasks)
  }

  async executeByBranch(branch: Branch): Promise<Tasks[]> {
    // Get tasks by branch (already filtered by today's date in repository)
    const tasks = await this.taskRepository.getTasksByBranch(branch)
    return this.sortTasksByDateTime(tasks)
  }

  async executeWithAllDetails(id: string): Promise<Tasks> {
    if (!id) {
      throw new Error('Task ID is required')
    }

    return this.taskRepository.getTaskByIdWithAllDetails(id)
  }

  async executeAllWithCompleteDetails(): Promise<Tasks[]> {
    return this.taskRepository.getAllTasksWithCompleteDetails()
  }
}
