import { Inject, Injectable } from '@nestjs/common'
import { TaskDetailStepTwoAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-two/task-detail-step-two-additional-service.entity'
import type { ITaskDetailStepTwoAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-two/task-detail-step-two-additional-service.repository'

@Injectable()
export class GetTaskDetailStepTwoAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailStepTwoAdditionalServiceRepository')
    private readonly taskDetailStepTwoAdditionalServiceRepository: ITaskDetailStepTwoAdditionalServiceRepository,
  ) {}

  async executeById(id: string): Promise<TaskDetailStepTwoAdditionalServiceEntity> {
    return this.taskDetailStepTwoAdditionalServiceRepository.getTaskDetailStepTwoAdditionalServiceById(id)
  }

  async executeByTaskDetailStepTwoId(taskDetailStepTwoId: string): Promise<TaskDetailStepTwoAdditionalServiceEntity[]> {
    return this.taskDetailStepTwoAdditionalServiceRepository.getTaskDetailStepTwoAdditionalServiceByTaskDetailStepTwoId(
      taskDetailStepTwoId,
    )
  }
}
