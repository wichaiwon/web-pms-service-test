import { Inject, Injectable } from '@nestjs/common'
import { CreateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two.dto'
import { TaskDetailStepTwoEntity } from 'src/domain/entities/task/task-detail-step-two/task-detail-step-two.entity'
import type { ITaskDetailStepTwoRepository } from 'src/domain/repositories/task/task-detail-step-two/task-detail-step-two.repository'

@Injectable()
export class CreateTaskDetailStepTwoUseCase {
  constructor(
    @Inject('ITaskDetailStepTwoRepository')
    private readonly taskDetailStepTwoRepository: ITaskDetailStepTwoRepository,
  ) {}

  async execute(createDto: CreateTaskDetailStepTwoDto): Promise<TaskDetailStepTwoEntity> {
    return this.taskDetailStepTwoRepository.createTaskDetailStepTwo(createDto)
  }
}
