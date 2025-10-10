import { TaskDetailAdditionalServiceEntity } from 'src/domain/entities/task/task-detail/task-detail-additional-service.entity'

export interface ITaskDetailAdditionalServiceRepository {
  findById(id: string): Promise<TaskDetailAdditionalServiceEntity | null>
  findByTaskDetailId(taskDetailId: string): Promise<TaskDetailAdditionalServiceEntity[]>
  create(service: Partial<TaskDetailAdditionalServiceEntity>): Promise<TaskDetailAdditionalServiceEntity>
  update(id: string, service: Partial<TaskDetailAdditionalServiceEntity>): Promise<TaskDetailAdditionalServiceEntity>
}
