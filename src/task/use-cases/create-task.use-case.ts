import { Injectable, Inject } from '@nestjs/common'
import { Tasks } from '../../domain/entities/task/task.entity'
import type { ITaskRepository } from '../../domain/repositories/task/task.repository.interface'
import { CreateTaskDto } from '../../application/dto/tasks/create-task.dto'

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(createTaskDto: CreateTaskDto): Promise<Tasks> {
    if (!createTaskDto.engine_number || !createTaskDto.chassis_number) {
      throw new Error('Engine and chassis are required')
    }

    // Check if task already exists with same engine/chassis
    const existingTasks = await this.taskRepository.getTasks()
    const duplicate = existingTasks.find(
      (task) =>
        task.engine_number === createTaskDto.engine_number && task.chassis_number === createTaskDto.chassis_number,
    )

    if (duplicate) {
      throw new Error('Task with same engine and chassis already exists')
    }

    return this.taskRepository.createTask(createTaskDto)
  }
}
