import { Injectable, Inject, BadRequestException } from '@nestjs/common'
import type { ITaskDetailRepository } from '../../domain/repositories/task/task-detail/task-detail.repository.interface'
import type { ITaskRepository } from '../../domain/repositories/task/task.repository'
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

  async execute(dto: CreateTaskDetailDto): Promise<TaskDetailEntity> {
    // Validate task exists
    const task = await this.taskRepository.findById(dto.task_id)
    if (!task) {
      throw new BadRequestException(`Task with id ${dto.task_id} not found`)
    }

    // Check if task_detail already exists for this task
    const existingDetails = await this.taskDetailRepository.findByTaskId(dto.task_id)
    if (existingDetails.length > 0) {
      throw new BadRequestException(`Task detail already exists for task ${dto.task_id}`)
    }

    // Business validation
    if (dto.car_mileage && dto.car_mileage < 0) {
      throw new BadRequestException('Car mileage cannot be negative')
    }

    const taskDetailData: Partial<TaskDetailEntity> = {
      task_id: dto.task_id,
      task_detail_image1: dto.task_detail_image1,
      task_detail_image2: dto.task_detail_image2,
      car_mileage: dto.car_mileage,
      fuel_level: dto.fuel_level,
      success_flag: false,
      created_by: dto.created_by,
      created_at: new Date(),
    }

    return this.taskDetailRepository.create(taskDetailData)
  }
}