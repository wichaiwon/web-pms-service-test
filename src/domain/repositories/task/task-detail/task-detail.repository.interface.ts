import { TaskDetailEntity } from "src/domain/entities/task/task-detail/task-detail.entity"


export interface ITaskDetailRepository {
  findById(id: string): Promise<TaskDetailEntity | null>
  findByTaskId(taskId: string): Promise<TaskDetailEntity[]>
  create(taskDetail: Partial<TaskDetailEntity>): Promise<TaskDetailEntity>
  update(id: string, taskDetail: Partial<TaskDetailEntity>): Promise<TaskDetailEntity>
}