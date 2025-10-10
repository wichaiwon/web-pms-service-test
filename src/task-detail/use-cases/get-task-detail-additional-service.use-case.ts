import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { TaskDetailAdditionalService } from 'src/domain/entities/task/task-detail/task-detail-additional-service.entity'
import type { ITaskDetailAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail/task-detail-addtional-service.repository.interface'

@Injectable()
export class GetTaskDetailAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailAdditionalServiceRepository')
    private readonly repository: ITaskDetailAdditionalServiceRepository,
  ) {}

  async execute(id: string): Promise<TaskDetailAdditionalService> {
    const service = await this.repository.findById(id)
    if (!service) {
      throw new NotFoundException(`TaskDetailAdditionalService with id ${id} not found`)
    }
    return service
  }

  async executeByTaskDetailId(taskDetailId: string): Promise<TaskDetailAdditionalService[]> {
    return this.repository.findByTaskDetailId(taskDetailId)
  }
}