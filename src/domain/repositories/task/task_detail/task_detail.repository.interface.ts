import { TaskDetail } from "src/domain/entities/task/task-detail/task-detail.entity"


export interface ITaskDetailRepository {
  findById(id: string): Promise<TaskDetail | null>
  findByTaskId(taskId: string): Promise<TaskDetail[]>
  create(taskDetail: Partial<TaskDetail>): Promise<TaskDetail>
  update(id: string, taskDetail: Partial<TaskDetail>): Promise<TaskDetail>
}