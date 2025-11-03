import { Injectable, Inject } from '@nestjs/common'
import { UpdateTaskDetailStepFourDto } from 'src/application/dto/tasks/task-detail-step-four/update-task-detail-step-four.dto'
import type { ITaskDetailStepFourRepository } from 'src/domain/repositories/task/task-detail-step-four/task-detail-step-four.repository.interface'

@Injectable()
export class UpdateTaskDetailStepFourUseCase {
  constructor(
    @Inject('ITaskDetailStepFourRepository')
    private readonly taskDetailStepFourRepository: ITaskDetailStepFourRepository,
  ) {}

  async execute(id: string, updateDto: UpdateTaskDetailStepFourDto): Promise<void> {
    return this.taskDetailStepFourRepository.updateTaskDetailStepFour(id, updateDto)
  }
}
