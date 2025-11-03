import { Injectable } from '@nestjs/common'
import { GetTaskDetailStepThreeUseCase } from './use-cases/get-task-detail-step-three.use-case'
import { UpdateTaskDetailStepThreeUseCase } from './use-cases/update-task-detail-step-three.use-case'
import { CreateTaskDetailStepThreeUseCase } from './use-cases/create-task-detail-step-three.use-case'
import { CreateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three.dto'
import { UpdateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/update-task-detail-step-three.dto'
import { ITaskDetailStepThreeService } from 'src/application/interfaces/tasks/task-detail-step-three/task-detail-step-three.service.interface'

@Injectable()
export class TaskDetailStepThreeService implements ITaskDetailStepThreeService {
  constructor(
    private readonly getTaskDetailStepThreeRepository: GetTaskDetailStepThreeUseCase,
    private readonly updateTaskDetailStepThreeRepository: UpdateTaskDetailStepThreeUseCase,
    private readonly createTaskDetailStepThreeRepository: CreateTaskDetailStepThreeUseCase,
  ) {}

  async createTaskDetailStepThree(createDto: CreateTaskDetailStepThreeDto) {
    return this.createTaskDetailStepThreeRepository.execute(createDto)
  }
  async getTaskDetailStepThreeById(id: string) {
    return this.getTaskDetailStepThreeRepository.executeById(id)
  }
  async getTaskDetailStepThreeByTaskId(taskId: string) {
    return this.getTaskDetailStepThreeRepository.executeByTaskId(taskId)
  }
  async updateTaskDetailStepThree(id: string, updateDto: UpdateTaskDetailStepThreeDto) {
    return this.updateTaskDetailStepThreeRepository.execute(id, updateDto)
  }
}
