import { Injectable, Inject } from '@nestjs/common'
import { TaskDetailStepFourEntity } from 'src/domain/entities/task/task-detail-step-four/task-detail-step-four.entity'
import type { ITaskDetailStepFourRepository } from 'src/domain/repositories/task/task-detail-step-four/task-detail-step-four.repository.interface'

@Injectable()
export class GetTaskDetailStepFourUseCase {
  constructor(
    @Inject('ITaskDetailStepFourRepository')
    private readonly taskDetailStepFourRepository: ITaskDetailStepFourRepository,
  ) {}

  async executeById(id: string): Promise<TaskDetailStepFourEntity> {
    return this.taskDetailStepFourRepository.getTaskDetailStepFourById(id)
  }

  async executeByTaskId(taskId: string): Promise<TaskDetailStepFourEntity[]> {
    return this.taskDetailStepFourRepository.getTaskDetailStepFourByTaskId(taskId)
  }
}