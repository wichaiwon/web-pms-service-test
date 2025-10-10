import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskDetailAdditionalService } from 'src/domain/entities/task/task-detail/task-detail-additional-service.entity'
import { ITaskDetailAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail/task-detail-addtional-service.repository.interface'
import { Repository } from 'typeorm'

@Injectable()
export class TaskDetailAdditionalServiceRepository implements ITaskDetailAdditionalServiceRepository {
  constructor(
    @InjectRepository(TaskDetailAdditionalService)
    private readonly repository: Repository<TaskDetailAdditionalService>,
  ) {}

  async findById(id: string): Promise<TaskDetailAdditionalService | null> {
    return this.repository.findOne({ where: { id } })
  }

  async findByTaskDetailId(taskDetailId: string): Promise<TaskDetailAdditionalService[]> {
    return this.repository.find({
      where: { task_detail_id: taskDetailId },
    })
  }

  async create(serviceData: Partial<TaskDetailAdditionalService>): Promise<TaskDetailAdditionalService> {
    const service = this.repository.create(serviceData)
    return this.repository.save(service)
  }

  async update(id: string, serviceData: Partial<TaskDetailAdditionalService>): Promise<TaskDetailAdditionalService> {
    await this.repository.update(id, serviceData)
    const updated = await this.findById(id)
    if (!updated) {
      throw new Error(`TaskDetailAdditionalService with id ${id} not found`)
    }
    return updated
  }
}
