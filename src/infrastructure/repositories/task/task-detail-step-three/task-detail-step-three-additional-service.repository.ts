import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three-additional-service.dto'
import { UpdateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/update-task-detail-step-three-additional-service'
import { TaskDetailStepThreeAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-three/task-detail-step-three-additional-service.entity'
import { ITaskDetailStepThreeAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-three/task-detail-step-three-additional-service.repository'
import { Repository } from 'typeorm'

@Injectable()
export class TaskDetailStepThreeAdditionalServiceRepository implements ITaskDetailStepThreeAdditionalServiceRepository {
  constructor(
    @InjectRepository(TaskDetailStepThreeAdditionalServiceEntity)
    private readonly taskDetailStepThreeAdditionalServiceRepository: Repository<TaskDetailStepThreeAdditionalServiceEntity>,
  ) {}
  async createTaskDetailStepThreeAdditionalService(
    createDto: CreateTaskDetailStepThreeAdditionalServiceDto,
  ): Promise<TaskDetailStepThreeAdditionalServiceEntity> {
    const entity = this.taskDetailStepThreeAdditionalServiceRepository.create(createDto)
    return this.taskDetailStepThreeAdditionalServiceRepository.save(entity)
  }
  async getTaskDetailStepThreeAdditionalServiceById(id: string): Promise<TaskDetailStepThreeAdditionalServiceEntity> {
    const service = await this.taskDetailStepThreeAdditionalServiceRepository.findOne({ where: { id } })
    if (!service) {
      throw new Error('TaskDetailStepThreeAdditionalService not found')
    }
    return service
  }
  async getTaskDetailStepThreeAdditionalServiceByTaskDetailStepThreeId(
    taskDetailStepThreeId: string,
  ): Promise<TaskDetailStepThreeAdditionalServiceEntity[]> {
    return this.taskDetailStepThreeAdditionalServiceRepository.find({
      where: { task_detail_step_three_id: taskDetailStepThreeId },
    })
  }
  async updateTaskDetailStepThreeAdditionalService(
    id: string,
    updateDto: UpdateTaskDetailStepThreeAdditionalServiceDto,
  ): Promise<void> {
    const result = await this.taskDetailStepThreeAdditionalServiceRepository.update(id, updateDto)
    if (result.affected === 0) {
      throw new Error('TaskDetailStepThreeAdditionalService not found or no changes made')
    }
  }
}
