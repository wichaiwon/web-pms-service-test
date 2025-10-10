import { Injectable, Inject } from '@nestjs/common'
import { UpdateTaskDetailStepOneAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-one/update-task-detail-step-one-additional-service.dto'
import type { ITaskDetailStepOneAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-one/task-detail-step-one-additional-service.repository'

@Injectable()
export class UpdateTaskDetailStepOneAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailStepOneAdditionalServiceRepository')
    private readonly repository: ITaskDetailStepOneAdditionalServiceRepository,
  ) {}

  async execute(id: string, updateDto: UpdateTaskDetailStepOneAdditionalServiceDto): Promise<void> {
    return this.repository.updateTaskDetailStepOneAdditionalService(id, updateDto)
  }
}