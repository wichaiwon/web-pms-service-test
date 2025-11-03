import { Injectable } from '@nestjs/common'
import { CreateTaskDetailStepOneAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one-additional-service.dto'
import { UpdateTaskDetailStepOneAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-one/update-task-detail-step-one-additional-service.dto'
import { TaskDetailStepOneAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-one/task-detail-step-one-additional-service.entity'
import { CreateTaskDetailStepOneAdditionalServiceUseCase } from '../use-cases/create-task-detail-step-one-additional-service.use-case'
import { GetTaskDetailStepOneAdditionalServiceUseCase } from '../use-cases/get-task-detail-step-one-additional-service.use-case'
import { UpdateTaskDetailStepOneAdditionalServiceUseCase } from '../use-cases/update-task-detail-step-one-additional-service.use-case'
import { ITaskDetailStepOneAdditionalServiceService } from 'src/application/interfaces/tasks/task-detail-step-one/task-detail-step-one-additional-service.service.interface'

@Injectable()
export class TaskDetailStepOneAdditionalServiceService implements ITaskDetailStepOneAdditionalServiceService {
  constructor(
    private readonly createTaskDetailStepOneAdditionalServiceUseCase: CreateTaskDetailStepOneAdditionalServiceUseCase,
    private readonly getTaskDetailStepOneAdditionalServiceUseCase: GetTaskDetailStepOneAdditionalServiceUseCase,
    private readonly updateTaskDetailStepOneAdditionalServiceUseCase: UpdateTaskDetailStepOneAdditionalServiceUseCase,
  ) {}

  async createTaskDetailStepOneAdditionalService(
    createDto: CreateTaskDetailStepOneAdditionalServiceDto,
  ): Promise<TaskDetailStepOneAdditionalServiceEntity> {
    return this.createTaskDetailStepOneAdditionalServiceUseCase.execute(createDto)
  }

  async getTaskDetailStepOneAdditionalServiceById(id: string): Promise<TaskDetailStepOneAdditionalServiceEntity> {
    return this.getTaskDetailStepOneAdditionalServiceUseCase.executeById(id)
  }

  async getTaskDetailStepOneAdditionalServiceByTaskDetailId(
    taskDetailStepOneId: string,
  ): Promise<TaskDetailStepOneAdditionalServiceEntity[]> {
    return this.getTaskDetailStepOneAdditionalServiceUseCase.executeByTaskDetailStepOneId(taskDetailStepOneId)
  }

  async updateTaskDetailStepOneAdditionalService(
    id: string,
    updateDto: UpdateTaskDetailStepOneAdditionalServiceDto,
  ): Promise<void> {
    return this.updateTaskDetailStepOneAdditionalServiceUseCase.execute(id, updateDto)
  }
}
