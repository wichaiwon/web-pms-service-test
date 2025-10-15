import { Injectable, Inject } from '@nestjs/common'
import { CreateTaskDetailStepFourDto } from 'src/application/dto/tasks/task-detail-step-four/create-task-detail-step-four.dto'
import { UpdateTaskDetailStepFourDto } from 'src/application/dto/tasks/task-detail-step-four/update-task-detail-step-four.dto'
import { TaskDetailStepFourEntity } from 'src/domain/entities/task/task-detail-step-four/task-detail-step-four.entity'
import { CreateTaskDetailStepFourUseCase } from './use-cases/create-task-detail-step-four.use-case'
import { GetTaskDetailStepFourUseCase } from './use-cases/get-task-detail-step-four.use-case'
import { UpdateTaskDetailStepFourUseCase } from './use-cases/update-task-detail-step-four.use-case'
import { ITaskDetailStepFourService } from 'src/application/interfaces/tasks/task-detail-step-four/task-detail-step-four.service.interface'

@Injectable()
export class TaskDetailStepFourService implements ITaskDetailStepFourService {
  constructor(
    private readonly createTaskDetailStepFourUseCase: CreateTaskDetailStepFourUseCase,
    private readonly getTaskDetailStepFourUseCase: GetTaskDetailStepFourUseCase,
    private readonly updateTaskDetailStepFourUseCase: UpdateTaskDetailStepFourUseCase,
  ) {}

  async createTaskDetailStepFour(createDto: CreateTaskDetailStepFourDto): Promise<TaskDetailStepFourEntity> {
    return this.createTaskDetailStepFourUseCase.execute(createDto)
  }

  async getTaskDetailStepFourById(id: string): Promise<TaskDetailStepFourEntity> {
    return this.getTaskDetailStepFourUseCase.executeById(id)
  }

  async getTaskDetailStepFourByTaskId(taskId: string): Promise<TaskDetailStepFourEntity[]> {
    return this.getTaskDetailStepFourUseCase.executeByTaskId(taskId)
  }

  async updateTaskDetailStepFour(id: string, updateDto: UpdateTaskDetailStepFourDto): Promise<void> {
    return this.updateTaskDetailStepFourUseCase.execute(id, updateDto)
  }
}
