import { Inject, Injectable } from '@nestjs/common'
import { CreateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two-additional-service.dto'
import { TaskDetailStepTwoAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-two/task-detail-step-two-additional-service.entity'
import type { ITaskDetailStepTwoAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-two/task-detail-step-two-additional-service.repository'

@Injectable()
export class CreateTaskDetailStepTwoAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailStepTwoAdditionalServiceRepository')
    private readonly taskDetailStepTwoAdditionalServiceRepository: ITaskDetailStepTwoAdditionalServiceRepository,
  ) {}
  async execute(
    createDto: CreateTaskDetailStepTwoAdditionalServiceDto,
  ): Promise<TaskDetailStepTwoAdditionalServiceEntity> {
    return this.taskDetailStepTwoAdditionalServiceRepository.createTaskDetailStepTwoAdditionalService(createDto)
  }
}
