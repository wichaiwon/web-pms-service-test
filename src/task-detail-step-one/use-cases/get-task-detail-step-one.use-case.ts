import { Injectable, Inject } from '@nestjs/common'
import { TaskDetailStepOne } from 'src/domain/entities/task/task-detail-step-one/task-detail-step-one.entity'
import type { ITaskDetailStepOneRepository } from 'src/domain/repositories/task/task-detail-step-one/task-detail-step-one.repository'

@Injectable()
export class GetTaskDetailStepOneUseCase {
  constructor(
    @Inject('ITaskDetailStepOneRepository')
    private readonly taskDetailStepOneRepository: ITaskDetailStepOneRepository,
  ) {}

  async executeById(id: string): Promise<TaskDetailStepOne> {
    return this.taskDetailStepOneRepository.getTaskDetailStepOneById(id)
  }

  async executeByTaskId(taskId: string): Promise<TaskDetailStepOne[]> {
    return this.taskDetailStepOneRepository.getTaskDetailStepOneByTaskId(taskId)
  }
}