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

  async execute(createDto: CreateTaskDetailAdditionalServiceDto): Promise<TaskDetailAdditionalServiceEntity> {
    // Validate task detail exists
    const taskDetail = await this.taskDetailRepository.getTaskDetailById(createDto.task_detail_id)
    if (!taskDetail) {
      throw new BadRequestException(`TaskDetail with id ${createDto.task_detail_id} not found`)
    }

    // Business Rule: ถ้าเลือก "เติมลมยาง" ต้องมี tire pressure
    const requiresTireInflation = (o: CreateTaskDetailAdditionalServiceDto) =>
      Array.isArray(o.additional_service)
      ? o.additional_service.includes(AdditionalService.TIRE_INFLATION)
      : o.additional_service === AdditionalService.TIRE_INFLATION

    if (requiresTireInflation(createDto)) {
      if (createDto.front_tire_pressure == null || createDto.back_tire_pressure == null) {
      throw new BadRequestException(
        'front_tire_pressure and back_tire_pressure are required when additional_service is เติมลมยาง',
      )
      }

      // Validate pressure range
      if (createDto.front_tire_pressure < 0 || createDto.front_tire_pressure > 100) {
      throw new BadRequestException('front_tire_pressure must be between 0-100 PSI')
      }

      if (createDto.back_tire_pressure < 0 || createDto.back_tire_pressure > 100) {
      throw new BadRequestException('back_tire_pressure must be between 0-100 PSI')
      }
    }
    return this.repository.createTaskDetailAdditionalService(createDto)
  }
}
