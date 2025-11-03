import { CreateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two-additional-service.dto'
import { UpdateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two-additional-service.dto'
import { TaskDetailStepTwoAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-two/task-detail-step-two-additional-service.entity'

export interface ITaskDetailStepTwoAdditionalServiceRepository {
  createTaskDetailStepTwoAdditionalService(
    createDto: CreateTaskDetailStepTwoAdditionalServiceDto,
  ): Promise<TaskDetailStepTwoAdditionalServiceEntity>
  getTaskDetailStepTwoAdditionalServiceById(id: string): Promise<TaskDetailStepTwoAdditionalServiceEntity>
  getTaskDetailStepTwoAdditionalServiceByTaskDetailStepTwoId(
    taskDetailStepTwoId: string,
  ): Promise<TaskDetailStepTwoAdditionalServiceEntity[]>
  updateTaskDetailStepTwoAdditionalService(
    id: string,
    updateDto: UpdateTaskDetailStepTwoAdditionalServiceDto,
  ): Promise<void>
}
