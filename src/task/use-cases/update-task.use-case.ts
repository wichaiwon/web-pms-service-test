import { Injectable, Inject } from '@nestjs/common'
import { Tasks } from '../../domain/entities/task/task.entity'
import type { ITaskRepository } from '../../domain/repositories/task/task.repository.interface'
import { UpdateTaskDto } from '../../application/dto/tasks/update-task.dto'

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(id: string, updateTaskDto: UpdateTaskDto): Promise<void> {
    // Check if task exists
    const existingTask = await this.taskRepository.getTaskById(id)
    if (!existingTask) {
      throw new Error(`Task with id ${id} not found`)
    }

    // Business validation
    if (existingTask.success_flag && updateTaskDto.success_flag === false) {
      throw new Error('Cannot revert completed task to incomplete')
    }
    
    await this.taskRepository.updateTask(id, updateTaskDto)
  }
}
