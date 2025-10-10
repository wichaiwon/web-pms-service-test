import { Injectable } from '@nestjs/common'
import { UpdateTaskDetailStepTwoUseCase } from './use-cases/update-task-detail-step-two.use-case'
import { CreateTaskDetailStepTwoUseCase } from './use-cases/create-task-detail-step-two.use-case'
import { GetTaskDetailStepTwoUseCase } from './use-cases/get-task-detail-step-two.use-case'
import { CreateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two.dto'
import { UpdateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two.dto'

@Injectable()
export class TaskDetailStepTwoService {
  constructor(
    private readonly getTaskDetailStepTwoRepository: GetTaskDetailStepTwoUseCase,
    private readonly createTaskDetailStepTwoRepository: CreateTaskDetailStepTwoUseCase,
    private readonly updateTaskDetailStepTwoUseCase: UpdateTaskDetailStepTwoUseCase,
  ) {}

  async create(createDto: CreateTaskDetailStepTwoDto) {
    return this.createTaskDetailStepTwoRepository.execute(createDto)
  }

  async findById(id: string) {
    return this.getTaskDetailStepTwoRepository.executeById(id)
  }
  async findByTaskId(taskId: string) {
    return this.getTaskDetailStepTwoRepository.executeByTaskId(taskId)
  }

  async update(id: string, updateDto: UpdateTaskDetailStepTwoDto) {
    return this.updateTaskDetailStepTwoUseCase.execute(id, updateDto)
  }
}
