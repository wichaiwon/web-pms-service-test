import { TaskDetailAdditionalService } from 'src/domain/entities/task/task-detail/task-detail-additional-service.entity'

export interface ITaskDetailAdditionalServiceRepository {
  findById(id: string): Promise<TaskDetailAdditionalService | null>
  findByTaskDetailId(taskDetailId: string): Promise<TaskDetailAdditionalService[]>
  create(service: Partial<TaskDetailAdditionalService>): Promise<TaskDetailAdditionalService>
  update(id: string, service: Partial<TaskDetailAdditionalService>): Promise<TaskDetailAdditionalService>
}
