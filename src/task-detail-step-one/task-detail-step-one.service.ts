import { Injectable } from '@nestjs/common'
import { CreateTaskDetailStepOneDto } from 'src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one.dto'
import { UpdateTaskDetailStepOneDto } from 'src/application/dto/tasks/task-detail-step-one/update-task-detail-step-one.dto'
import { CreateTaskDetailStepOneUseCase } from './use-cases/create-task-detail-step-one.use-case'
import { GetTaskDetailStepOneUseCase } from './use-cases/get-task-detail-step-one.use-case'
import { UpdateTaskDetailStepOneUseCase } from './use-cases/update-task-detail-step-one.use-case'
import { ITaskDetailStepOneService } from 'src/application/interfaces/tasks/task-detail-step-one/task-detail-step-one.service.interface'

@Injectable()
export class TaskDetailStepOneService implements ITaskDetailStepOneService {
  constructor(
    private readonly createTaskDetailStepOneUseCase: CreateTaskDetailStepOneUseCase,
    private readonly getTaskDetailStepOneUseCase: GetTaskDetailStepOneUseCase,
    private readonly updateTaskDetailStepOneUseCase: UpdateTaskDetailStepOneUseCase,
  ) {}

  async createTaskDetailStepOne(createDto: CreateTaskDetailStepOneDto) {
    return this.createTaskDetailStepOneUseCase.execute(createDto)
  }

  async getTaskDetailStepOneById(id: string) {
    return this.getTaskDetailStepOneUseCase.executeById(id)
  }

  async getTaskDetailStepOneByTaskId(taskId: string) {
    return this.getTaskDetailStepOneUseCase.executeByTaskId(taskId)
  }

  async updateTaskDetailStepOne(id: string, updateDto: UpdateTaskDetailStepOneDto) {
    return this.updateTaskDetailStepOneUseCase.execute(id, updateDto)
  }
}