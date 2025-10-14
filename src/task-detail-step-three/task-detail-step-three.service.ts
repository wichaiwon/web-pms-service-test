import { Injectable } from '@nestjs/common'
import { GetTaskDetailStepThreeUseCase } from './use-cases/get-task-detail-step-three.use-case'
import { UpdateTaskDetailStepThreeUseCase } from './use-cases/update-task-detail-step-three.use-case'
import { CreateTaskDetailStepThreeUseCase } from './use-cases/create-task-detail-step-three.use-case'
import { CreateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three.dto'
import { UpdateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/update-task-detail-step-three.dto'

@Injectable()
export class TaskDetailStepThreeService {
  constructor(
    private readonly getTaskDetailStepThreeRepository: GetTaskDetailStepThreeUseCase,
    private readonly updateTaskDetailStepThreeRepository: UpdateTaskDetailStepThreeUseCase,
    private readonly createTaskDetailStepThreeRepository: CreateTaskDetailStepThreeUseCase,
  ) {}

  async create(createDto: CreateTaskDetailStepThreeDto) {
    return this.createTaskDetailStepThreeRepository.execute(createDto)
  }
  async findById(id: string) {
    return this.getTaskDetailStepThreeRepository.executeById(id)
  }
  async findByTaskId(taskId: string) {
    return this.getTaskDetailStepThreeRepository.executeByTaskId(taskId)
  }
  async update(id: string, updateDto: UpdateTaskDetailStepThreeDto) {
    return this.updateTaskDetailStepThreeRepository.execute(id, updateDto)
  }
}
