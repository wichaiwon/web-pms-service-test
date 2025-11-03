import { CreateTaskDetailAdditionalServiceDto } from 'src/application/dto/tasks/task-detail/create-task-detail-addtional-service.dto'
import { UpdateTaskDetailAdditionalServiceDto } from 'src/application/dto/tasks/task-detail/update-task-detail-additional-service.dto'
import { TaskDetailAdditionalServiceEntity } from 'src/domain/entities/task/task-detail/task-detail-additional-service.entity'

export interface ITaskDetailAdditionalServiceRepository {
  createTaskDetailAdditionalService(
    createDto: CreateTaskDetailAdditionalServiceDto,
  ): Promise<TaskDetailAdditionalServiceEntity>
  getTaskDetailAdditionalServiceById(id: string): Promise<TaskDetailAdditionalServiceEntity>
  getTaskDetailAdditionalServicesByTaskDetailId(taskDetailId: string): Promise<TaskDetailAdditionalServiceEntity[]>
  updateTaskDetailAdditionalService(id: string, updateDto: UpdateTaskDetailAdditionalServiceDto): Promise<void>
}
