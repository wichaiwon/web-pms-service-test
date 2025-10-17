import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import type { ITaskDetailRepository } from '../../domain/repositories/task/task-detail/task-detail.repository.interface'
import { TaskDetailEntity } from 'src/domain/entities/task/task-detail/task-detail.entity'

@Injectable()
export class GetTaskDetailUseCase {
  constructor(
    @Inject('ITaskDetailRepository')
    private readonly taskDetailRepository: ITaskDetailRepository,
  ) {}

  async execute(id: string): Promise<TaskDetailEntity> {
    const taskDetail = await this.taskDetailRepository.getTaskDetailById(id)
    if (!taskDetail) {
      throw new NotFoundException(`TaskDetail with id ${id} not found`)
    }
    return taskDetail
  }

  async executeByTaskId(taskId: string): Promise<TaskDetailEntity[]> {
    return this.taskDetailRepository.getTaskDetailByTaskId(taskId)
  }
}
