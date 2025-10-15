import { Injectable, Inject } from '@nestjs/common'
import { CreateTaskDetailStepOneDto } from 'src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one.dto'
import { TaskDetailStepOneEntity } from 'src/domain/entities/task/task-detail-step-one/task-detail-step-one.entity'
import type { ITaskDetailStepOneRepository } from 'src/domain/repositories/task/task-detail-step-one/task-detail-step-one.repository.interface'
import type { ITaskRepository } from 'src/domain/repositories/task/task.repository.interface'

@Injectable()
export class CreateTaskDetailStepOneUseCase {
  constructor(
    @Inject('ITaskDetailStepOneRepository')
    private readonly taskDetailStepOneRepository: ITaskDetailStepOneRepository,
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(createDto: CreateTaskDetailStepOneDto): Promise<TaskDetailStepOneEntity> {
    const task = await this.taskRepository.getTaskById(createDto.task_id)
    if (!task) {
      throw new Error(`Task with id ${createDto.task_id} not found`)
    }

    const existingDetails = await this.taskDetailStepOneRepository.getTaskDetailStepOneByTaskId(createDto.task_id)
    if (existingDetails.length > 0) {
      throw new Error(`Task detail step one already exists for task ${createDto.task_id}`)
    }

    return this.taskDetailStepOneRepository.createTaskDetailStepOne(createDto)
  }
}