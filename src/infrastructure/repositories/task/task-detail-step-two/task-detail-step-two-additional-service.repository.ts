import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two-additional-service.dto'
import { UpdateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two-additional-service.dto'
import { TaskDetailStepTwoAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-two/task-detail-step-two-additional-service.entity'
import { ITaskDetailStepTwoAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-two/task-detail-step-two-additional-service.repository'
import { Repository } from 'typeorm'

@Injectable()
export class TaskDetailStepTwoAdditionalServiceRepository implements ITaskDetailStepTwoAdditionalServiceRepository {
  constructor(
    @InjectRepository(TaskDetailStepTwoAdditionalServiceEntity)
    private readonly repository: Repository<TaskDetailStepTwoAdditionalServiceEntity>,
  ) {}
  async createTaskDetailStepTwoAdditionalService(
    createDto: CreateTaskDetailStepTwoAdditionalServiceDto,
  ): Promise<TaskDetailStepTwoAdditionalServiceEntity> {
    const entity = this.repository.create(createDto)
    return this.repository.save(entity)
  }
  async getTaskDetailStepTwoAdditionalServiceById(id: string): Promise<TaskDetailStepTwoAdditionalServiceEntity> {
    const service = await this.repository.findOne({ where: { id } })
    if (!service) {
      throw new Error('TaskDetailStepTwoAdditionalService not found')
    }
    return service
  }
  async getTaskDetailStepTwoAdditionalServiceByTaskDetailStepTwoId(
    taskDetailStepTwoId: string,
  ): Promise<TaskDetailStepTwoAdditionalServiceEntity[]> {
    return this.repository.find({ where: { task_detail_step_two_id: taskDetailStepTwoId } })
  }
  async updateTaskDetailStepTwoAdditionalService(
    id: string,
    updateDto: UpdateTaskDetailStepTwoAdditionalServiceDto,
  ): Promise<void> {
    const result = await this.repository.update(id, updateDto)
    if (result.affected === 0) {
      throw new Error('TaskDetailStepTwoAdditionalService not found or no changes made')
    }
  }
}
