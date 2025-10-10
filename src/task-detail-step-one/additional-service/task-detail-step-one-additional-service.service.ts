import { Injectable } from '@nestjs/common'
import { CreateTaskDetailStepOneAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one-additional-service.dto'
import { UpdateTaskDetailStepOneAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-one/update-task-detail-step-one-additional-service.dto'
import { CreateTaskDetailStepOneAdditionalServiceUseCase } from '../use-cases/create-task-detail-step-one-additional-service.use-case'
import { GetTaskDetailStepOneAdditionalServiceUseCase } from '../use-cases/get-task-detail-step-one-additional-service.use-case'
import { UpdateTaskDetailStepOneAdditionalServiceUseCase } from '../use-cases/update-task-detail-step-one-additional-service.use-case'

@Injectable()
export class TaskDetailStepOneAdditionalServiceService {
  constructor(
    private readonly createTaskDetailStepOneAdditionalServiceUseCase: CreateTaskDetailStepOneAdditionalServiceUseCase,
    private readonly getTaskDetailStepOneAdditionalServiceUseCase: GetTaskDetailStepOneAdditionalServiceUseCase,
    private readonly updateTaskDetailStepOneAdditionalServiceUseCase: UpdateTaskDetailStepOneAdditionalServiceUseCase,
  ) {}

  async create(createDto: CreateTaskDetailStepOneAdditionalServiceDto) {
    return this.createTaskDetailStepOneAdditionalServiceUseCase.execute(createDto)
  }

  async findById(id: string) {
    return this.getTaskDetailStepOneAdditionalServiceUseCase.executeById(id)
  }

  async findByTaskDetailStepOneId(taskDetailStepOneId: string) {
    return this.getTaskDetailStepOneAdditionalServiceUseCase.executeByTaskDetailStepOneId(taskDetailStepOneId)
  }

  async update(id: string, updateDto: UpdateTaskDetailStepOneAdditionalServiceDto) {
    return this.updateTaskDetailStepOneAdditionalServiceUseCase.execute(id, updateDto)
  }
}