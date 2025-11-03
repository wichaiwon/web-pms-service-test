import { Injectable, Inject } from '@nestjs/common'
import { CreateTaskDetailStepFourDto } from 'src/application/dto/tasks/task-detail-step-four/create-task-detail-step-four.dto'
import { TaskDetailStepFourEntity } from 'src/domain/entities/task/task-detail-step-four/task-detail-step-four.entity'
import type { ITaskDetailStepFourRepository } from 'src/domain/repositories/task/task-detail-step-four/task-detail-step-four.repository.interface'
import type { ITaskRepository } from 'src/domain/repositories/task/task.repository.interface'

@Injectable()
export class CreateTaskDetailStepFourUseCase {
  constructor(
    @Inject('ITaskDetailStepFourRepository')
    private readonly taskDetailStepFourRepository: ITaskDetailStepFourRepository,
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(createDto: CreateTaskDetailStepFourDto): Promise<TaskDetailStepFourEntity> {
    const task = await this.taskRepository.getTaskById(createDto.task_id)
    if (!task) {
      throw new Error(`Task with id ${createDto.task_id} not found`)
    }

    const existingDetails = await this.taskDetailStepFourRepository.getTaskDetailStepFourByTaskId(createDto.task_id)
    if (existingDetails.length > 0) {
      throw new Error(`Task detail step four already exists for task ${createDto.task_id}`)
    }

    return this.taskDetailStepFourRepository.createTaskDetailStepFour(createDto)
  }
}
