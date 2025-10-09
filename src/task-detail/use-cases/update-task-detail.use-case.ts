import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import type { ITaskDetailRepository } from '../../domain/repositories/task/task_detail/task_detail.repository.interface'
import { UpdateTaskDetailDto } from 'src/application/dto/tasks/task-detail/update-task-detail.dto'
import { TaskDetail } from 'src/domain/entities/task/task-detail/task-detail.entity'

@Injectable()
export class UpdateTaskDetailUseCase {
  constructor(
    @Inject('ITaskDetailRepository')
    private readonly taskDetailRepository: ITaskDetailRepository,
  ) {}

  async execute(id: string, dto: UpdateTaskDetailDto): Promise<TaskDetail> {
    const existingDetail = await this.taskDetailRepository.findById(id)
    if (!existingDetail) {
      throw new NotFoundException(`TaskDetail with id ${id} not found`)
    }

    // Business validation
    if (dto.car_mileage !== undefined && dto.car_mileage < 0) {
      throw new Error('Car mileage cannot be negative')
    }

    if (existingDetail.success_flag && dto.success_flag === false) {
      throw new Error('Cannot revert completed task detail to incomplete')
    }

    return this.taskDetailRepository.update(id, {
      ...dto,
      updated_at: new Date(),
    })
  }
}