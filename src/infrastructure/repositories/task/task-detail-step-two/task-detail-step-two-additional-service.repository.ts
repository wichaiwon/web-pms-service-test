import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two-additional-service.dto'
import { UpdateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two-additional-service.dto'
import { TaskDetailStepTwoAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-two/task-detail-step-two-additional-service.entity'
import { ITaskDetailStepTwoAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-two/task-detail-step-two-additional-service.repository.interface'
import { Repository } from 'typeorm'

@Injectable()
export class TaskDetailStepTwoAdditionalServiceRepository implements ITaskDetailStepTwoAdditionalServiceRepository {
  constructor(
    @InjectRepository(TaskDetailStepTwoAdditionalServiceEntity)
    private readonly taskDetailStepTwoAdditionalServiceRepository: Repository<TaskDetailStepTwoAdditionalServiceEntity>,
  ) {}
  async createTaskDetailStepTwoAdditionalService(
    createDto: CreateTaskDetailStepTwoAdditionalServiceDto,
  ): Promise<TaskDetailStepTwoAdditionalServiceEntity> {
    const entity = this.taskDetailStepTwoAdditionalServiceRepository.create(createDto)
    return this.taskDetailStepTwoAdditionalServiceRepository.save(entity)
  }
  async getTaskDetailStepTwoAdditionalServiceById(id: string): Promise<TaskDetailStepTwoAdditionalServiceEntity> {
    const service = await this.taskDetailStepTwoAdditionalServiceRepository.findOne({ where: { id } })
    if (!service) {
      throw new Error('TaskDetailStepTwoAdditionalService not found')
    }
    return service
  }
  async getTaskDetailStepTwoAdditionalServiceByTaskDetailStepTwoId(
    taskDetailStepTwoId: string,
  ): Promise<TaskDetailStepTwoAdditionalServiceEntity[]> {
    return this.taskDetailStepTwoAdditionalServiceRepository.find({
      where: { task_detail_step_two_id: taskDetailStepTwoId },
    })
  }
  async updateTaskDetailStepTwoAdditionalService(
    id: string,
    updateDto: UpdateTaskDetailStepTwoAdditionalServiceDto,
  ): Promise<void> {
    const result = await this.taskDetailStepTwoAdditionalServiceRepository.update(id, updateDto)
    if (result.affected === 0) {
      throw new Error('TaskDetailStepTwoAdditionalService not found or no changes made')
    }
  }
}
