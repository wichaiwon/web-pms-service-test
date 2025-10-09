import { Injectable } from '@nestjs/common'
import { CreateTaskDetailAdditionalServiceDto } from 'src/application/dto/tasks/task-detail/create-task-detail-addtional-service.dto'
import { CreateTaskDetailAdditionalServiceUseCase } from '../use-cases/create-task-detail-additional-service.use-case'
import { GetTaskDetailAdditionalServiceUseCase } from '../use-cases/get-task-detail-additional-service.use-case'
import { UpdateTaskDetailAdditionalServiceUseCase } from '../use-cases/update-task-detail-additional-service.use-case'
import { TaskDetailAdditionalService } from 'src/domain/entities/task/task-detail/task-detail-additional-service.entity'
import { UpdateTaskDetailAdditionalServiceDto } from 'src/application/dto/tasks/task-detail/update-task-detail-additional-service.dto'

@Injectable()
export class TaskDetailAdditionalServiceService {
  constructor(
    private readonly createUseCase: CreateTaskDetailAdditionalServiceUseCase,
    private readonly getUseCase: GetTaskDetailAdditionalServiceUseCase,
    private readonly updateUseCase: UpdateTaskDetailAdditionalServiceUseCase,
  ) {}

  async create(createDto: CreateTaskDetailAdditionalServiceDto): Promise<TaskDetailAdditionalService> {
    return this.createUseCase.execute(createDto)
  }

  async getById(id: string): Promise<TaskDetailAdditionalService> {
    return this.getUseCase.execute(id)
  }

  async getByTaskDetailId(taskDetailId: string): Promise<TaskDetailAdditionalService[]> {
    return this.getUseCase.executeByTaskDetailId(taskDetailId)
  }

  async update(id: string, updateDto: UpdateTaskDetailAdditionalServiceDto): Promise<TaskDetailAdditionalService> {
    return this.updateUseCase.execute(id, updateDto)
  }
}