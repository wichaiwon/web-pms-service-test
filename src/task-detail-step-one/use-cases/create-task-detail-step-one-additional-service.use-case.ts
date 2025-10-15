import { Injectable, Inject } from '@nestjs/common'
import { CreateTaskDetailStepOneAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one-additional-service.dto'
import { TaskDetailStepOneAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-one/task-detail-step-one-additional-service.entity'
import type { ITaskDetailStepOneAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-one/task-detail-step-one-additional-service.repository.interface'
import type { ITaskDetailStepOneRepository } from 'src/domain/repositories/task/task-detail-step-one/task-detail-step-one.repository.interface'

@Injectable()
export class CreateTaskDetailStepOneAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailStepOneAdditionalServiceRepository')
    private readonly repository: ITaskDetailStepOneAdditionalServiceRepository,
    @Inject('ITaskDetailStepOneRepository')
    private readonly taskDetailStepOneRepository: ITaskDetailStepOneRepository,
  ) {}

  async execute(createDto: CreateTaskDetailStepOneAdditionalServiceDto): Promise<TaskDetailStepOneAdditionalServiceEntity> {
    const existingDetail = await this.taskDetailStepOneRepository.getTaskDetailStepOneById(createDto.task_detail_step_one_id)
    if (!existingDetail) {
      throw new Error(`Task detail step one with id ${createDto.task_detail_step_one_id} not found`)
    }

    return this.repository.createTaskDetailStepOneAdditionalService(createDto)
  }
}