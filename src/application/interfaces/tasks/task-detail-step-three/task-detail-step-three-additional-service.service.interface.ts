import { CreateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three-additional-service.dto'
import { UpdateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/update-task-detail-step-three-additional-service'
import { TaskDetailStepThreeAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-three/task-detail-step-three-additional-service.entity'

export interface ITaskDetailStepThreeAdditionalServiceService {
  createTaskDetailStepThreeAdditionalService(
    createDto: CreateTaskDetailStepThreeAdditionalServiceDto,
  ): Promise<TaskDetailStepThreeAdditionalServiceEntity>
  getTaskDetailStepThreeAdditionalServiceById(id: string): Promise<TaskDetailStepThreeAdditionalServiceEntity>
  getTaskDetailStepThreeAdditionalServiceByTaskDetailId(
    taskDetailId: string,
  ): Promise<TaskDetailStepThreeAdditionalServiceEntity[]>
  updateTaskDetailStepThreeAdditionalService(
    id: string,
    updateDto: UpdateTaskDetailStepThreeAdditionalServiceDto,
  ): Promise<void>
}
