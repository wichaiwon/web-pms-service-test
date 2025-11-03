import { Inject, Injectable } from '@nestjs/common'
import { TaskDetailStepTwoEntity } from 'src/domain/entities/task/task-detail-step-two/task-detail-step-two.entity'
import type { ITaskDetailStepTwoRepository } from 'src/domain/repositories/task/task-detail-step-two/task-detail-step-two.repository.interface'

@Injectable()
export class GetTaskDetailStepTwoUseCase {
  constructor(
    @Inject('ITaskDetailStepTwoRepository')
    private readonly taskDetailStepTwoRepository: ITaskDetailStepTwoRepository,
  ) {}

  async executeById(id: string): Promise<TaskDetailStepTwoEntity> {
    return this.taskDetailStepTwoRepository.getTaskDetailStepTwoById(id)
  }
  async executeByTaskId(taskId: string): Promise<TaskDetailStepTwoEntity[]> {
    return this.taskDetailStepTwoRepository.getTaskDetailStepTwoByTaskId(taskId)
  }
}
