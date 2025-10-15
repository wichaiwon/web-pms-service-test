import { Inject, Injectable } from '@nestjs/common'
import { UpdateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two.dto'
import type { ITaskDetailStepTwoRepository } from 'src/domain/repositories/task/task-detail-step-two/task-detail-step-two.repository.interface'

@Injectable()
export class UpdateTaskDetailStepTwoUseCase {
  constructor(
    @Inject('ITaskDetailStepTwoRepository')
    private readonly taskDetailStepTwoRepository: ITaskDetailStepTwoRepository,
  ) {}
  async execute(id: string, updateDto: UpdateTaskDetailStepTwoDto): Promise<void> {
    return this.taskDetailStepTwoRepository.updateTaskDetailStepTwo(id, updateDto)
  }
}
