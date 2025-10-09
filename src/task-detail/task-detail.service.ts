import { Injectable } from '@nestjs/common'
import { TaskDetail } from '../domain/entities/task/task-detail/task-detail.entity'
import { CreateTaskDetailDto } from '../application/dto/tasks/task-detail/create-task-detail.dto'
import { UpdateTaskDetailDto } from '../application/dto/tasks/task-detail/update-task-detail.dto'
import { ITaskDetailService } from '../application/interfaces/tasks/task-detail/task-detail.service.interface'
import { CreateTaskDetailUseCase } from './use-cases/create-task-detail.use-case'
import { GetTaskDetailUseCase } from './use-cases/get-task-detail.use-case'
import { UpdateTaskDetailUseCase } from './use-cases/update-task-detail.use-case'

@Injectable()
export class TaskDetailService implements ITaskDetailService {
  constructor(
    private readonly createTaskDetailUseCase: CreateTaskDetailUseCase,
    private readonly getTaskDetailUseCase: GetTaskDetailUseCase,
    private readonly updateTaskDetailUseCase: UpdateTaskDetailUseCase,
  ) {}

  async createTaskDetail(createDto: CreateTaskDetailDto): Promise<TaskDetail> {
    return this.createTaskDetailUseCase.execute(createDto)
  }

  async getTaskDetailById(id: string): Promise<TaskDetail> {
    return this.getTaskDetailUseCase.execute(id)
  }

  async getTaskDetailsByTaskId(taskId: string): Promise<TaskDetail[]> {
    return this.getTaskDetailUseCase.executeByTaskId(taskId)
  }

  async updateTaskDetail(id: string, updateDto: UpdateTaskDetailDto): Promise<TaskDetail> {
    return this.updateTaskDetailUseCase.execute(id, updateDto)
  }
}