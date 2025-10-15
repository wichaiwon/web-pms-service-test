import { Inject, Injectable } from '@nestjs/common'
import { CreateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two-additional-service.dto'
import { TaskDetailStepTwoAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-two/task-detail-step-two-additional-service.entity'
import type { ITaskDetailStepTwoAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-two/task-detail-step-two-additional-service.repository.interface'
import type { ITaskDetailStepTwoRepository } from 'src/domain/repositories/task/task-detail-step-two/task-detail-step-two.repository.interface'

@Injectable()
export class CreateTaskDetailStepTwoAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailStepTwoAdditionalServiceRepository')
    private readonly taskDetailStepTwoAdditionalServiceRepository: ITaskDetailStepTwoAdditionalServiceRepository,
    @Inject('ITaskDetailStepTwoRepository')
    private readonly taskDetailStepTwoRepository: ITaskDetailStepTwoRepository,
  ) {}
  async execute(
    createDto: CreateTaskDetailStepTwoAdditionalServiceDto,
  ): Promise<TaskDetailStepTwoAdditionalServiceEntity> {
    const existingDetail = await this.taskDetailStepTwoRepository.getTaskDetailStepTwoById(createDto.task_detail_step_two_id)
    if (!existingDetail) {
      throw new Error(`Task detail step two with id ${createDto.task_detail_step_two_id} not found`)
    }

    return this.taskDetailStepTwoAdditionalServiceRepository.createTaskDetailStepTwoAdditionalService(createDto)
  }
}
