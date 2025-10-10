import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskDetailAdditionalServiceEntity } from 'src/domain/entities/task/task-detail/task-detail-additional-service.entity'
import { ITaskDetailAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail/task-detail-addtional-service.repository.interface'
import { Repository } from 'typeorm'

@Injectable()
export class TaskDetailAdditionalServiceRepository implements ITaskDetailAdditionalServiceRepository {
  constructor(
    @InjectRepository(TaskDetailAdditionalServiceEntity)
    private readonly repository: Repository<TaskDetailAdditionalServiceEntity>,
  ) {}

  async findById(id: string): Promise<TaskDetailAdditionalServiceEntity | null> {
    return this.repository.findOne({ where: { id } })
  }

  async findByTaskDetailId(taskDetailId: string): Promise<TaskDetailAdditionalServiceEntity[]> {
    return this.repository.find({
      where: { task_detail_id: taskDetailId },
    })
  }

  async create(serviceData: Partial<TaskDetailAdditionalServiceEntity>): Promise<TaskDetailAdditionalServiceEntity> {
    const service = this.repository.create(serviceData)
    return this.repository.save(service)
  }

  async update(id: string, serviceData: Partial<TaskDetailAdditionalServiceEntity>): Promise<TaskDetailAdditionalServiceEntity> {
    await this.repository.update(id, serviceData)
    const updated = await this.findById(id)
    if (!updated) {
      throw new Error(`TaskDetailAdditionalService with id ${id} not found`)
    }
    return updated
  }
}
