import { Injectable } from '@nestjs/common'
import { Tasks } from '../domain/entities/task/task.entity'
import { CreateTaskDto } from '../application/dto/tasks/create-task.dto'
import { UpdateTaskDto } from '../application/dto/tasks/update-task.dto'
import { ITaskService } from '../application/interfaces/tasks/task.service.interface'
import { CreateTaskUseCase } from './use-cases/create-task.use-case'
import { GetTaskUseCase } from './use-cases/get-task.use-case'
import { UpdateTaskUseCase } from './use-cases/update-task.use-case'

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTaskUseCase: GetTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.createTaskUseCase.execute(createTaskDto)
  }

  async getTaskById(id: string): Promise<Tasks> {
    return this.getTaskUseCase.execute(id)
  }

  async getAllTasks(): Promise<Tasks[]> {
    return this.getTaskUseCase.executeAll()
  }

  async getTasksByResponsible(userId: string): Promise<Tasks[]> {
    return this.getTaskUseCase.executeByResponsible(userId)
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<void> {
    return this.updateTaskUseCase.execute(id, updateTaskDto)
  }

  async getTasksByStatus(status: string): Promise<Tasks[]> {
    return this.getTaskUseCase.executeByStatus(status)
  }
}