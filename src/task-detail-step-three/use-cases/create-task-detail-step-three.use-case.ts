import { Inject, Injectable } from '@nestjs/common'
import { CreateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three.dto'
import { TaskDetailStepThreeEntity } from 'src/domain/entities/task/task-detail-step-three/task-detail-step-three.entity'
import type { ITaskDetailStepThreeRepository } from 'src/domain/repositories/task/task-detail-step-three/task-detail-step-three.repository'

@Injectable()
export class CreateTaskDetailStepThreeUseCase {
  constructor(
    @Inject('ITaskDetailStepThreeRepository')
    private readonly taskDetailStepThreeRepository: ITaskDetailStepThreeRepository,
  ) {}
  async execute(createDto: CreateTaskDetailStepThreeDto): Promise<TaskDetailStepThreeEntity> {
    return this.taskDetailStepThreeRepository.createTaskDetailStepThree(createDto)
  }
}
