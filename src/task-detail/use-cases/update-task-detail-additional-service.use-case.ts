import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common'
import { TaskDetailAdditionalServiceEntity } from '../../domain/entities/task/task-detail/task-detail-additional-service.entity'
import type { ITaskDetailAdditionalServiceRepository } from '../../domain/repositories/task/task-detail/task-detail-addtional-service.repository.interface'
import { UpdateTaskDetailAdditionalServiceDto } from '../../application/dto/tasks/task-detail/update-task-detail-additional-service.dto'
import { AdditionalService } from 'src/shared/enum/task-detail'

@Injectable()
export class UpdateTaskDetailAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailAdditionalServiceRepository')
    private readonly repository: ITaskDetailAdditionalServiceRepository,
  ) {}

  async execute(id: string, updateDto: UpdateTaskDetailAdditionalServiceDto): Promise<void> {
    const existing = await this.repository.getTaskDetailAdditionalServiceById(id)
    if (!existing) {
      throw new NotFoundException(`TaskDetailAdditionalService with id ${id} not found`)
    }

    // Business Rule: ถ้าเปลี่ยนเป็น "เติมลมยาง" ต้องมี tire pressure
    const newService = updateDto.additional_service || existing.additional_service
    if (newService === AdditionalService.TIRE_INFLATION) {
      const frontPressure =
        updateDto.front_tire_pressure !== undefined ? updateDto.front_tire_pressure : existing.front_tire_pressure
      const backPressure =
        updateDto.back_tire_pressure !== undefined ? updateDto.back_tire_pressure : existing.back_tire_pressure

      if (!frontPressure || !backPressure) {
        throw new BadRequestException(
          'front_tire_pressure and back_tire_pressure are required when additional_service is เติมลมยาง',
        )
      }

      if (frontPressure < 0 || frontPressure > 100 || backPressure < 0 || backPressure > 100) {
        throw new BadRequestException('Tire pressure must be between 0-100 PSI')
      }
    }

    return this.repository.updateTaskDetailAdditionalService(id, updateDto)
  }
}
