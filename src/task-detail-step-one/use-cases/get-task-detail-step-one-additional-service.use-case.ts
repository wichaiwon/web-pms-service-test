import { Injectable, Inject } from '@nestjs/common'
import { TaskDetailStepOneAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-one/task-detail-step-one-additional-service.entity'
import type { ITaskDetailStepOneAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-one/task-detail-step-one-additional-service.repository.interface'

@Injectable()
export class GetTaskDetailStepOneAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailStepOneAdditionalServiceRepository')
    private readonly repository: ITaskDetailStepOneAdditionalServiceRepository,
  ) {}

  async executeById(id: string): Promise<TaskDetailStepOneAdditionalServiceEntity> {
    return this.repository.getTaskDetailStepOneAdditionalServiceById(id)
  }

  async executeByTaskDetailStepOneId(taskDetailStepOneId: string): Promise<TaskDetailStepOneAdditionalServiceEntity[]> {
    return this.repository.getTaskDetailStepOneAdditionalServiceByTaskDetailStepOneId(taskDetailStepOneId)
  }
}