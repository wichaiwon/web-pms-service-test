import { Inject, Injectable } from '@nestjs/common'
import { UpdateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/update-task-detail-step-three-additional-service'
import type { ITaskDetailStepThreeAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-three/task-detail-step-three-additional-service.repository'

@Injectable()
export class UpdateTaskDetailStepThreeAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailStepThreeAdditionalServiceRepository')
    private readonly taskDetailStepThreeAdditionalServiceRepository: ITaskDetailStepThreeAdditionalServiceRepository,
  ) {}
  async execute(id: string, updateDto: UpdateTaskDetailStepThreeAdditionalServiceDto): Promise<void> {
    await this.taskDetailStepThreeAdditionalServiceRepository.updateTaskDetailStepThreeAdditionalService(id, updateDto)
  }
}
