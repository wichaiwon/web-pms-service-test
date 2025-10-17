import { Injectable, Inject } from '@nestjs/common'
import { TaskDetailStepOneEntity } from 'src/domain/entities/task/task-detail-step-one/task-detail-step-one.entity'
import type { ITaskDetailStepOneRepository } from 'src/domain/repositories/task/task-detail-step-one/task-detail-step-one.repository.interface'

@Injectable()
export class GetTaskDetailStepOneUseCase {
  constructor(
    @Inject('ITaskDetailStepOneRepository')
    private readonly taskDetailStepOneRepository: ITaskDetailStepOneRepository,
  ) {}

  async executeById(id: string): Promise<TaskDetailStepOneEntity> {
    return this.taskDetailStepOneRepository.getTaskDetailStepOneById(id)
  }

  async executeByTaskId(taskId: string): Promise<TaskDetailStepOneEntity[]> {
    return this.taskDetailStepOneRepository.getTaskDetailStepOneByTaskId(taskId)
  }
}
