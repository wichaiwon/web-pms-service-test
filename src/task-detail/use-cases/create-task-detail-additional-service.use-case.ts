import { Injectable, Inject, BadRequestException } from '@nestjs/common'
import type { ITaskDetailAdditionalServiceRepository } from '../../domain/repositories/task/task-detail/task-detail-addtional-service.repository.interface'
import type { ITaskDetailRepository } from '../../domain/repositories/task/task-detail/task-detail.repository.interface'
import { CreateTaskDetailAdditionalServiceDto } from 'src/application/dto/tasks/task-detail/create-task-detail-addtional-service.dto'
import { TaskDetailAdditionalServiceEntity } from 'src/domain/entities/task/task-detail/task-detail-additional-service.entity'
import { AdditionalService } from 'src/shared/enum/task-detail'

@Injectable()
export class CreateTaskDetailAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailAdditionalServiceRepository')
    private readonly repository: ITaskDetailAdditionalServiceRepository,
    @Inject('ITaskDetailRepository')
    private readonly taskDetailRepository: ITaskDetailRepository,
  ) {}

  async execute(dto: CreateTaskDetailAdditionalServiceDto): Promise<TaskDetailAdditionalServiceEntity> {
    // Validate task detail exists
    const taskDetail = await this.taskDetailRepository.findById(dto.task_detail_id)
    if (!taskDetail) {
      throw new BadRequestException(`TaskDetail with id ${dto.task_detail_id} not found`)
    }

    // Business Rule: ถ้าเลือก "เติมลมยาง" ต้องมี tire pressure
    if (dto.additional_service === AdditionalService.TIRE_INFLATION) {
      if (!dto.front_tire_pressure || !dto.back_tire_pressure) {
        throw new BadRequestException(
          'front_tire_pressure and back_tire_pressure are required when additional_service is เติมลมยาง',
        )
      }

      // Validate pressure range
      if (dto.front_tire_pressure < 0 || dto.front_tire_pressure > 100) {
        throw new BadRequestException('front_tire_pressure must be between 0-100 PSI')
      }

      if (dto.back_tire_pressure < 0 || dto.back_tire_pressure > 100) {
        throw new BadRequestException('back_tire_pressure must be between 0-100 PSI')
      }
    }

    const serviceData: Partial<TaskDetailAdditionalServiceEntity> = {
      task_detail_id: dto.task_detail_id,
      tire_pressure: dto.tire_pressure,
      additional_service: dto.additional_service,
      front_tire_pressure: dto.front_tire_pressure ,
      back_tire_pressure: dto.back_tire_pressure,
      comment: dto.comment
    }

    return this.repository.create(serviceData)
  }
}
