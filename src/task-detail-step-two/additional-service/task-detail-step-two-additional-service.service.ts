import { Injectable } from '@nestjs/common'
import { GetTaskDetailStepTwoAdditionalServiceUseCase } from '../use-cases/get-task-detail-step-two-additional-service.use-case'
import { CreateTaskDetailStepTwoAdditionalServiceUseCase } from '../use-cases/create-task-detail-step-two-additional-service.use-case'
import { UpdateTaskDetailStepTwoAdditionalServiceUseCase } from '../use-cases/update-task-detail-step-two-additional-service.use-case'
import { CreateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two-additional-service.dto'
import { UpdateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two-additional-service.dto'
import { ITaskDetailStepTwoAdditionalServiceService } from 'src/application/interfaces/tasks/task-detail-step-two/task-detail-step-two-additional-service.service.interface'

@Injectable()
export class TaskDetailStepTwoAdditionalServiceService implements ITaskDetailStepTwoAdditionalServiceService {
  constructor(
    private readonly getTaskDetailStepTwoAdditionalServiceUseCase: GetTaskDetailStepTwoAdditionalServiceUseCase,
    private readonly createTaskDetailStepTwoAdditionalServiceUseCase: CreateTaskDetailStepTwoAdditionalServiceUseCase,
    private readonly updateTaskDetailStepTwoAdditionalServiceUseCase: UpdateTaskDetailStepTwoAdditionalServiceUseCase,
  ) {}
  async createTaskDetailStepTwoAdditionalService(createDto: CreateTaskDetailStepTwoAdditionalServiceDto) {
    return this.createTaskDetailStepTwoAdditionalServiceUseCase.execute(createDto)
  }
  async getTaskDetailStepTwoAdditionalServiceById(id: string) {
    return this.getTaskDetailStepTwoAdditionalServiceUseCase.executeById(id)
  }
  async getTaskDetailStepTwoAdditionalServiceByTaskDetailId(taskDetailStepTwoId: string) {
    return this.getTaskDetailStepTwoAdditionalServiceUseCase.executeByTaskDetailStepTwoId(taskDetailStepTwoId)
  }

  async updateTaskDetailStepTwoAdditionalService(id: string, updateDto: UpdateTaskDetailStepTwoAdditionalServiceDto) {
    return this.updateTaskDetailStepTwoAdditionalServiceUseCase.execute(id, updateDto)
  }
}
