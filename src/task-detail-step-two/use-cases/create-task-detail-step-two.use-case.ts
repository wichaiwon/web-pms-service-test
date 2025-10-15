import { Inject, Injectable } from '@nestjs/common'
import { CreateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two.dto'
import { TaskDetailStepTwoEntity } from 'src/domain/entities/task/task-detail-step-two/task-detail-step-two.entity'
import type { ITaskDetailStepTwoRepository } from 'src/domain/repositories/task/task-detail-step-two/task-detail-step-two.repository.interface'
import type { ITaskRepository } from 'src/domain/repositories/task/task.repository.interface'

@Injectable()
export class CreateTaskDetailStepTwoUseCase {
  constructor(
    @Inject('ITaskDetailStepTwoRepository')
    private readonly taskDetailStepTwoRepository: ITaskDetailStepTwoRepository,
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(createDto: CreateTaskDetailStepTwoDto): Promise<TaskDetailStepTwoEntity> {
    const task = await this.taskRepository.getTaskById(createDto.task_id)
    if (!task) {
      throw new Error(`Task with id ${createDto.task_id} not found`)
    }

    const existingDetails = await this.taskDetailStepTwoRepository.getTaskDetailStepTwoByTaskId(createDto.task_id)
    if (existingDetails.length > 0) {
      throw new Error(`Task detail step two already exists for task ${createDto.task_id}`)
    }
    return this.taskDetailStepTwoRepository.createTaskDetailStepTwo(createDto)
  }
}
