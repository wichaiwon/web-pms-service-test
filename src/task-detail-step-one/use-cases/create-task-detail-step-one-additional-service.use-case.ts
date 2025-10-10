import { Injectable, Inject } from '@nestjs/common'
import { CreateTaskDetailStepOneAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one-additional-service.dto'
import { TaskDetailStepOneAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-one/task-detail-step-one-additional-service.entity'
import type { ITaskDetailStepOneAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-one/task-detail-step-one-additional-service.repository'

@Injectable()
export class CreateTaskDetailStepOneAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailStepOneAdditionalServiceRepository')
    private readonly repository: ITaskDetailStepOneAdditionalServiceRepository,
  ) {}

  async execute(createDto: CreateTaskDetailStepOneAdditionalServiceDto): Promise<TaskDetailStepOneAdditionalServiceEntity> {
    return this.repository.createTaskDetailStepOneAdditionalService(createDto)
  }
}