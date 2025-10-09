import { CreateTaskDetailDto } from 'src/application/dto/tasks/task-detail/create-task-detail.dto'
import { UpdateTaskDetailDto } from 'src/application/dto/tasks/task-detail/update-task-detail.dto'
import { TaskDetail } from 'src/domain/entities/task/task-detail/task-detail.entity'

export interface ITaskDetailService {
  createTaskDetail(createDto: CreateTaskDetailDto): Promise<TaskDetail>
  getTaskDetailById(id: string): Promise<TaskDetail>
  getTaskDetailsByTaskId(taskId: string): Promise<TaskDetail[]>
  updateTaskDetail(id: string, updateDto: UpdateTaskDetailDto): Promise<TaskDetail>
}