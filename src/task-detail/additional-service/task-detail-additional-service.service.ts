import { Injectable } from '@nestjs/common'
import { CreateTaskDetailAdditionalServiceDto } from 'src/application/dto/tasks/task-detail/create-task-detail-addtional-service.dto'
import { CreateTaskDetailAdditionalServiceUseCase } from '../use-cases/create-task-detail-additional-service.use-case'
import { GetTaskDetailAdditionalServiceUseCase } from '../use-cases/get-task-detail-additional-service.use-case'
import { UpdateTaskDetailAdditionalServiceUseCase } from '../use-cases/update-task-detail-additional-service.use-case'
import { TaskDetailAdditionalServiceEntity } from 'src/domain/entities/task/task-detail/task-detail-additional-service.entity'
import { UpdateTaskDetailAdditionalServiceDto } from 'src/application/dto/tasks/task-detail/update-task-detail-additional-service.dto'
import { ITaskDetailAdditionalServiceService } from 'src/application/interfaces/tasks/task-detail/task-detail-additional-service.service.interface'

@Injectable()
export class TaskDetailAdditionalServiceService implements ITaskDetailAdditionalServiceService {
  constructor(
    private readonly createUseCase: CreateTaskDetailAdditionalServiceUseCase,
    private readonly getUseCase: GetTaskDetailAdditionalServiceUseCase,
    private readonly updateUseCase: UpdateTaskDetailAdditionalServiceUseCase,
  ) {}

  async createTaskDetailAdditionalService(
    createDto: CreateTaskDetailAdditionalServiceDto,
  ): Promise<TaskDetailAdditionalServiceEntity> {
    return this.createUseCase.execute(createDto)
  }

  async getTaskDetailAdditionalServiceById(id: string): Promise<TaskDetailAdditionalServiceEntity> {
    return this.getUseCase.execute(id)
  }

  async getTaskDetailAdditionalServiceByTaskDetailId(
    taskDetailId: string,
  ): Promise<TaskDetailAdditionalServiceEntity[]> {
    return this.getUseCase.executeByTaskDetailId(taskDetailId)
  }

  async updateTaskDetailAdditionalService(id: string, updateDto: UpdateTaskDetailAdditionalServiceDto): Promise<void> {
    return this.updateUseCase.execute(id, updateDto)
  }
}
