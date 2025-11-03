import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { TaskDetailAdditionalServiceEntity } from 'src/domain/entities/task/task-detail/task-detail-additional-service.entity'
import type { ITaskDetailAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail/task-detail-addtional-service.repository.interface'

@Injectable()
export class GetTaskDetailAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailAdditionalServiceRepository')
    private readonly repository: ITaskDetailAdditionalServiceRepository,
  ) {}

  async execute(id: string): Promise<TaskDetailAdditionalServiceEntity> {
    const service = await this.repository.getTaskDetailAdditionalServiceById(id)
    if (!service) {
      throw new NotFoundException(`TaskDetailAdditionalService with id ${id} not found`)
    }
    return service
  }

  async executeByTaskDetailId(taskDetailId: string): Promise<TaskDetailAdditionalServiceEntity[]> {
    return this.repository.getTaskDetailAdditionalServicesByTaskDetailId(taskDetailId)
  }
}
