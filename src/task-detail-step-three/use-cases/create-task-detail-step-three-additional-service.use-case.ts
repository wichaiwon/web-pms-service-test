import { Inject, Injectable } from '@nestjs/common'
import { CreateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three-additional-service.dto'
import { TaskDetailStepThreeAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-three/task-detail-step-three-additional-service.entity'
import type { ITaskDetailStepThreeAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-three/task-detail-step-three-additional-service.repository'

@Injectable()
export class CreateTaskDetailStepThreeAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailStepThreeRepository')
    private readonly taskDetailStepThreeRepository: ITaskDetailStepThreeAdditionalServiceRepository,
  ) {}
  async execute(
    createDto: CreateTaskDetailStepThreeAdditionalServiceDto,
  ): Promise<TaskDetailStepThreeAdditionalServiceEntity> {
    return this.taskDetailStepThreeRepository.createTaskDetailStepThreeAdditionalService(createDto)
  }
}
