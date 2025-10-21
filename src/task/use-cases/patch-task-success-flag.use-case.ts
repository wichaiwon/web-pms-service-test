import { Inject, Injectable } from '@nestjs/common'
import { PatchTaskSuccessFlagDto } from 'src/application/dto/tasks/patch-task-success-flag'
import type { ITaskRepository } from 'src/domain/repositories/task/task.repository.interface'

@Injectable()
export class PatchTaskSuccessFlagUseCase {
  constructor(
    // Inject necessary repositories or services here
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}
  async execute(id: string, patchTaskSuccessFlag: PatchTaskSuccessFlagDto): Promise<void> {
    const existingTask = await this.taskRepository.getTaskById(id)
    if (!existingTask) {
      throw new Error(`Task with id ${id} not found`)
    }

    await this.taskRepository.patchTaskSuccessFlag(id, patchTaskSuccessFlag)
  }
}
