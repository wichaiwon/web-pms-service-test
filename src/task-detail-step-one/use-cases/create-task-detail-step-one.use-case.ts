import { Injectable, Inject } from '@nestjs/common'
import { CreateTaskDetailStepOneDto } from 'src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one.dto'
import { TaskDetailStepOneEntity } from 'src/domain/entities/task/task-detail-step-one/task-detail-step-one.entity'
import type { ITaskDetailStepOneRepository } from 'src/domain/repositories/task/task-detail-step-one/task-detail-step-one.repository'

@Injectable()
export class CreateTaskDetailStepOneUseCase {
  constructor(
    @Inject('ITaskDetailStepOneRepository')
    private readonly taskDetailStepOneRepository: ITaskDetailStepOneRepository,
  ) {}

  async execute(createDto: CreateTaskDetailStepOneDto): Promise<TaskDetailStepOneEntity> {
    return this.taskDetailStepOneRepository.createTaskDetailStepOne(createDto)
  }
}