import { Inject, Injectable } from '@nestjs/common'
import { UpdateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two-additional-service.dto'
import type { ITaskDetailStepTwoRepository } from 'src/domain/repositories/task/task-detail-step-two/task-detail-step-two.repository.interface'

@Injectable()
export class UpdateTaskDetailStepTwoAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailStepTwoRepository')
    private readonly taskDetailStepTwoRepository: ITaskDetailStepTwoRepository,
  ) {}

  async execute(id: string, updateDto: UpdateTaskDetailStepTwoAdditionalServiceDto): Promise<void> {
    return this.taskDetailStepTwoRepository.updateTaskDetailStepTwo(id, updateDto)
  }
}
