import { Inject, Injectable } from '@nestjs/common'
import { PatchTaskEngineChassisDto } from 'src/application/dto/tasks/patch-task-engine-chassis'
import type { ITaskRepository } from 'src/domain/repositories/task/task.repository.interface'

@Injectable()
export class PatchTaskEngineChassisUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}
  async execute(id: string, patchTaskEngineChassis: PatchTaskEngineChassisDto): Promise<void> {
    const existingTask = await this.taskRepository.getTaskById(id)
    if (!existingTask) {
      throw new Error(`Task with id ${id} not found`)
    }

    await this.taskRepository.patchTaskEngineChassis(id, patchTaskEngineChassis)
  }
}
