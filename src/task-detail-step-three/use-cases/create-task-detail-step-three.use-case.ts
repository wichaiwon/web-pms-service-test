import { Inject, Injectable } from '@nestjs/common'
import { CreateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three.dto'
import { TaskDetailStepThreeEntity } from 'src/domain/entities/task/task-detail-step-three/task-detail-step-three.entity'
import type { ITaskDetailStepThreeRepository } from 'src/domain/repositories/task/task-detail-step-three/task-detail-step-three.repository.interface'
import type { ITaskRepository } from 'src/domain/repositories/task/task.repository.interface'

@Injectable()
export class CreateTaskDetailStepThreeUseCase {
  constructor(
    @Inject('ITaskDetailStepThreeRepository')
    private readonly taskDetailStepThreeRepository: ITaskDetailStepThreeRepository,
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}
  async execute(createDto: CreateTaskDetailStepThreeDto): Promise<TaskDetailStepThreeEntity> {
    const task = await this.taskRepository.getTaskById(createDto.task_id)
    if (!task) {
      throw new Error(`Task with id ${createDto.task_id} not found`)
    }
    
    const existingDetails = await this.taskDetailStepThreeRepository.getTaskDetailStepThreeByTaskId(createDto.task_id)
    if (existingDetails.length > 0) {
      throw new Error(`Task detail step three already exists for task ${createDto.task_id}`)
    }
    return this.taskDetailStepThreeRepository.createTaskDetailStepThree(createDto)
  }
}
