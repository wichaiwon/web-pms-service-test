import { Injectable, Inject } from '@nestjs/common'
import { UpdateTaskDetailStepOneDto } from 'src/application/dto/tasks/task-detail-step-one/update-task-detail-step-one.dto'
import type { ITaskDetailStepOneRepository } from 'src/domain/repositories/task/task-detail-step-one/task-detail-step-one.repository'

@Injectable()
export class UpdateTaskDetailStepOneUseCase {
  constructor(
    @Inject('ITaskDetailStepOneRepository')
    private readonly taskDetailStepOneRepository: ITaskDetailStepOneRepository,
  ) {}

  async execute(id: string, updateDto: UpdateTaskDetailStepOneDto): Promise<void> {
    return this.taskDetailStepOneRepository.updateTaskDetailStepOne(id, updateDto)
  }
}