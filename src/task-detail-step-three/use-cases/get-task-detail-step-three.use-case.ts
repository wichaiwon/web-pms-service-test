import { Inject, Injectable } from '@nestjs/common'
import { TaskDetailStepThreeEntity } from 'src/domain/entities/task/task-detail-step-three/task-detail-step-three.entity'
import type { ITaskDetailStepThreeRepository } from 'src/domain/repositories/task/task-detail-step-three/task-detail-step-three.repository'

@Injectable()
export class GetTaskDetailStepThreeUseCase {
  constructor(
    @Inject('ITaskDetailStepThreeRepository')
    private readonly taskDetailStepThreeRepository: ITaskDetailStepThreeRepository,
  ) {}
  async executeById(id: string): Promise<TaskDetailStepThreeEntity> {
    return this.taskDetailStepThreeRepository.getTaskDetailStepThreeById(id)
  }
  async executeByTaskId(taskId: string): Promise<TaskDetailStepThreeEntity[]> {
    return this.taskDetailStepThreeRepository.getTaskDetailStepThreeByTaskId(taskId)
  }
}
