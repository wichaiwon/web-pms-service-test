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
    return this.taskRepository.createTask(createTaskDto)
  }
}
