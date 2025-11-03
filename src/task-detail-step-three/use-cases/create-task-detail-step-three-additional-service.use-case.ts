import { Inject, Injectable } from '@nestjs/common'
import { CreateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three-additional-service.dto'
import { TaskDetailStepThreeAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-three/task-detail-step-three-additional-service.entity'
import type { ITaskDetailStepThreeAdditionalServiceRepository } from 'src/domain/repositories/task/task-detail-step-three/task-detail-step-three-additional-service.repository.interface'
import type { ITaskDetailStepThreeRepository } from 'src/domain/repositories/task/task-detail-step-three/task-detail-step-three.repository.interface'

@Injectable()
export class CreateTaskDetailStepThreeAdditionalServiceUseCase {
  constructor(
    @Inject('ITaskDetailStepThreeAdditionalServiceRepository')
    private readonly taskDetailStepThreeAdditionalServiceRepository: ITaskDetailStepThreeAdditionalServiceRepository,
    @Inject('ITaskDetailStepThreeRepository')
    private readonly taskDetailStepThreeRepository: ITaskDetailStepThreeRepository,
  ) {}
  async execute(
    createDto: CreateTaskDetailStepThreeAdditionalServiceDto,
  ): Promise<TaskDetailStepThreeAdditionalServiceEntity> {
    const taskDetailStepThree = await this.taskDetailStepThreeRepository.getTaskDetailStepThreeById(
      createDto.task_detail_step_three_id,
    )
    if (!taskDetailStepThree) {
      throw new Error(`TaskDetailStepThree with id ${createDto.task_detail_step_three_id} not found`)
    }

    return this.taskDetailStepThreeAdditionalServiceRepository.createTaskDetailStepThreeAdditionalService(createDto)
  }
}
