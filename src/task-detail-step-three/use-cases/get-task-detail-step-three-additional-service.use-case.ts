import { Inject, Injectable } from '@nestjs/common'
import { TaskDetailStepThreeAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-three/task-detail-step-three-additional-service.entity'
import type { ITaskDetailStepThreeAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-three/task-detail-step-three-additional-service.repository'

@Injectable()
export class GetTaskDetailStepThreeAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailStepThreeAdditionalServiceRepository')
    private readonly taskDetailStepThreeAdditionalServiceRepository: ITaskDetailStepThreeAdditionalServiceRepository,
  ) {}

  async executeById(id: string): Promise<TaskDetailStepThreeAdditionalServiceEntity> {
    return this.taskDetailStepThreeAdditionalServiceRepository.getTaskDetailStepThreeAdditionalServiceById(id)
  }
  async executeByTaskDetailStepThreeId(
    taskDetailStepThreeId: string,
  ): Promise<TaskDetailStepThreeAdditionalServiceEntity[]> {
    return this.taskDetailStepThreeAdditionalServiceRepository.getTaskDetailStepThreeAdditionalServiceByTaskDetailStepThreeId(
      taskDetailStepThreeId,
    )
  }
}
