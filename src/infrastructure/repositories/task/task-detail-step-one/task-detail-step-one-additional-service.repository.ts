import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTaskDetailStepOneAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one-additional-service.dto'
import { UpdateTaskDetailStepOneAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-one/update-task-detail-step-one-additional-service.dto'
import { TaskDetailStepOneAdditionalService } from 'src/domain/entities/task/task-detail-step-one/task-detail-step-one-additional-service.entity'
import { ITaskDetailStepOneAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-one/task-detail-step-one-additional-service.repository'

@Injectable()
export class TaskDetailStepOneAdditionalServiceRepository implements ITaskDetailStepOneAdditionalServiceRepository {
  constructor(
    @InjectRepository(TaskDetailStepOneAdditionalService)
    private readonly repository: Repository<TaskDetailStepOneAdditionalService>,
  ) {}

  async createTaskDetailStepOneAdditionalService(createDto: CreateTaskDetailStepOneAdditionalServiceDto): Promise<TaskDetailStepOneAdditionalService> {
    const service = this.repository.create(createDto)
    return this.repository.save(service)
  }

  async getTaskDetailStepOneAdditionalServiceById(id: string): Promise<TaskDetailStepOneAdditionalService> {
    const service = await this.repository.findOne({ where: { id } })
    if (!service) {
      throw new Error(`TaskDetailStepOneAdditionalService with id ${id} not found`)
    }
    return service
  }

  async getTaskDetailStepOneAdditionalServiceByTaskDetailStepOneId(taskDetailStepOneId: string): Promise<TaskDetailStepOneAdditionalService[]> {
    return this.repository.find({
      where: { task_detail_step_one_id: taskDetailStepOneId },
    })
  }

  async updateTaskDetailStepOneAdditionalService(id: string, updateDto: UpdateTaskDetailStepOneAdditionalServiceDto): Promise<void> {
    const result = await this.repository.update(id, updateDto)
    
    if (result.affected === 0) {
      throw new Error(`TaskDetailStepOneAdditionalService with id ${id} not found`)
    }
  }
}