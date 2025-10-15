import { Injectable } from '@nestjs/common'
import { UpdateTaskDetailStepTwoUseCase } from './use-cases/update-task-detail-step-two.use-case'
import { CreateTaskDetailStepTwoUseCase } from './use-cases/create-task-detail-step-two.use-case'
import { GetTaskDetailStepTwoUseCase } from './use-cases/get-task-detail-step-two.use-case'
import { CreateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two.dto'
import { UpdateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two.dto'
import { ITaskDetailStepTwoService } from 'src/application/interfaces/tasks/task-detail-step-two/task-detail-step-two.service.interface'

@Injectable()
export class TaskDetailStepTwoService implements ITaskDetailStepTwoService {
  constructor(
    private readonly getTaskDetailStepTwoRepository: GetTaskDetailStepTwoUseCase,
    private readonly createTaskDetailStepTwoRepository: CreateTaskDetailStepTwoUseCase,
    private readonly updateTaskDetailStepTwoUseCase: UpdateTaskDetailStepTwoUseCase,
  ) {}

  async createTaskDetailStepTwo(createDto: CreateTaskDetailStepTwoDto) {
    return this.createTaskDetailStepTwoRepository.execute(createDto)
  }

  async getTaskDetailStepTwoById(id: string) {
    return this.getTaskDetailStepTwoRepository.executeById(id)
  }
  async getTaskDetailStepTwoByTaskId(taskId: string) {
    return this.getTaskDetailStepTwoRepository.executeByTaskId(taskId)
  }

  async updateTaskDetailStepTwo(id: string, updateDto: UpdateTaskDetailStepTwoDto) {
    return this.updateTaskDetailStepTwoUseCase.execute(id, updateDto)
  }
}
