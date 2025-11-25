import { Inject, Injectable } from '@nestjs/common'
import { UpdateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/update-task-detail-step-three.dto'
import type { ITaskDetailStepThreeRepository } from 'src/domain/repositories/task/task-detail-step-three/task-detail-step-three.repository.interface'

@Injectable()
export class UpdateTaskDetailStepThreeUseCase {
  constructor(
    @Inject('ITaskDetailStepThreeRepository')
    private readonly taskDetailStepThreeRepository: ITaskDetailStepThreeRepository,
  ) {}

  async execute(id: string, updateDto: UpdateTaskDetailStepThreeDto): Promise<void> {
    // Set updated_at timestamp
    const updateData = {
      ...updateDto,
      updated_at: new Date(),
    }

    await this.taskDetailStepThreeRepository.updateTaskDetailStepThree(id, updateData)
  }
}
