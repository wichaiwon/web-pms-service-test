import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import type { ITaskDetailRepository } from '../../domain/repositories/task/task-detail/task-detail.repository.interface'
import { UpdateTaskDetailDto } from 'src/application/dto/tasks/task-detail/update-task-detail.dto'

@Injectable()
export class UpdateTaskDetailUseCase {
  constructor(
    @Inject('ITaskDetailRepository')
    private readonly taskDetailRepository: ITaskDetailRepository,
  ) {}

  async execute(id: string, updateDto: UpdateTaskDetailDto): Promise<void> {
    const existingDetail = await this.taskDetailRepository.getTaskDetailById(id)
    if (!existingDetail) {
      throw new NotFoundException(`TaskDetail with id ${id} not found`)
    }

    // Business validation
    if (updateDto.car_mileage !== undefined && updateDto.car_mileage < 0) {
      throw new Error('Car mileage cannot be negative')
    }

    if (existingDetail.success_flag && updateDto.success_flag === false) {
      throw new Error('Cannot revert completed task detail to incomplete')
    }

    return this.taskDetailRepository.updateTaskDetail(id, updateDto)
  }
}
