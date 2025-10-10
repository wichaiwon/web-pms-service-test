import { Injectable } from '@nestjs/common'
import { GetTaskDetailStepTwoAdditionalServiceUseCase } from '../use-cases/get-task-detail-step-two-additional-service.use-case'
import { CreateTaskDetailStepTwoAdditionalServiceUseCase } from '../use-cases/create-task-detail-step-two-additional-service.use-case'
import { UpdateTaskDetailStepTwoAdditionalServiceUseCase } from '../use-cases/update-task-detail-step-two-additional-service.use-case'
import { CreateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two-additional-service.dto'
import { UpdateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two-additional-service.dto'

@Injectable()
export class TaskDetailStepTwoAdditionalServiceService {
  constructor(
    private readonly getTaskDetailStepTwoAdditionalServiceUseCase: GetTaskDetailStepTwoAdditionalServiceUseCase,
    private readonly createTaskDetailStepTwoAdditionalServiceUseCase: CreateTaskDetailStepTwoAdditionalServiceUseCase,
    private readonly updateTaskDetailStepTwoAdditionalServiceUseCase: UpdateTaskDetailStepTwoAdditionalServiceUseCase,
  ) {}
  async create(createDto: CreateTaskDetailStepTwoAdditionalServiceDto) {
    return this.createTaskDetailStepTwoAdditionalServiceUseCase.execute(createDto)
  }
  async findById(id: string) {
    return this.getTaskDetailStepTwoAdditionalServiceUseCase.executeById(id)
  }
  async findByTaskDetailStepTwoId(taskDetailStepTwoId: string) {
    return this.getTaskDetailStepTwoAdditionalServiceUseCase.executeByTaskDetailStepTwoId(taskDetailStepTwoId)
  }

  async update(id: string, updateDto: UpdateTaskDetailStepTwoAdditionalServiceDto) {
    return this.updateTaskDetailStepTwoAdditionalServiceUseCase.execute(id, updateDto)
  }
}
