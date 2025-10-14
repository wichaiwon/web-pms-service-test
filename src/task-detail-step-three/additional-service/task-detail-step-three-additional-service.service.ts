import { Injectable } from '@nestjs/common'
import { GetTaskDetailStepThreeAdditionalServiceUseCase } from '../use-cases/get-task-detail-step-three-additional-service.use-case'
import { CreateTaskDetailStepThreeAdditionalServiceUseCase } from '../use-cases/create-task-detail-step-three-additional-service.use-case'
import { UpdateTaskDetailStepThreeAdditionalServiceUseCase } from '../use-cases/update-task-detail-step-three-additional-service.use-case'
import { CreateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three-additional-service.dto'
import { UpdateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/update-task-detail-step-three-additional-service'

@Injectable()
export class TaskDetailStepThreeAdditionalServiceService {
  constructor(
    private readonly getTaskDetailStepThreeAdditionalServiceUseCase: GetTaskDetailStepThreeAdditionalServiceUseCase,
    private readonly createTaskDetailStepThreeAdditionalServiceUseCase: CreateTaskDetailStepThreeAdditionalServiceUseCase,
    private readonly updateTaskDetailStepThreeAdditionalServiceUseCase: UpdateTaskDetailStepThreeAdditionalServiceUseCase,
  ) {}
  async create(createDto: CreateTaskDetailStepThreeAdditionalServiceDto) {
    return this.createTaskDetailStepThreeAdditionalServiceUseCase.execute(createDto)
  }
  async findById(id: string) {
    return this.getTaskDetailStepThreeAdditionalServiceUseCase.executeById(id)
  }
  async findByTaskDetailStepThreeId(taskDetailStepThreeId: string) {
    return this.getTaskDetailStepThreeAdditionalServiceUseCase.executeByTaskDetailStepThreeId(taskDetailStepThreeId)
  }
  async update(id: string, updateDto: UpdateTaskDetailStepThreeAdditionalServiceDto) {
    return this.updateTaskDetailStepThreeAdditionalServiceUseCase.execute(id, updateDto)
  }
}
