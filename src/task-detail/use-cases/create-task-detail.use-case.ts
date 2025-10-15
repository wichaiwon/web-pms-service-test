import { Injectable, Inject, BadRequestException } from '@nestjs/common'
import type { ITaskDetailRepository } from '../../domain/repositories/task/task-detail/task-detail.repository.interface'
import type { ITaskRepository } from '../../domain/repositories/task/task.repository.interface'
import { TaskDetailEntity } from 'src/domain/entities/task/task-detail/task-detail.entity'
import { CreateTaskDetailDto } from 'src/application/dto/tasks/task-detail/create-task-detail.dto'

@Injectable()
export class CreateTaskDetailUseCase {
  constructor(
    @Inject('ITaskDetailRepository')
    private readonly taskDetailRepository: ITaskDetailRepository,
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(createDto: CreateTaskDetailDto): Promise<TaskDetailEntity> {
    // Validate task exists
    const task = await this.taskRepository.getTaskById(createDto.task_id)
    if (!task) {
      throw new BadRequestException(`Task with id ${createDto.task_id} not found`)
    }

    // Check if task_detail already exists for this task
    const existingDetails = await this.taskDetailRepository.getTaskDetailByTaskId(createDto.task_id)
    if (existingDetails.length > 0) {
      throw new BadRequestException(`Task detail already exists for task ${createDto.task_id}`)
    }

    // Business validation
    if (createDto.car_mileage && createDto.car_mileage < 0) {
      throw new BadRequestException('Car mileage cannot be negative')
    }
    return this.taskDetailRepository.createTaskDetail(createDto)

  }
}