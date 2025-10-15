import { CreateTaskDetailDto } from 'src/application/dto/tasks/task-detail/create-task-detail.dto'
import { UpdateTaskDetailDto } from 'src/application/dto/tasks/task-detail/update-task-detail.dto'
import { TaskDetailEntity } from 'src/domain/entities/task/task-detail/task-detail.entity'

export interface ITaskDetailService {
  createTaskDetail(createDto: CreateTaskDetailDto): Promise<TaskDetailEntity>
  getTaskDetailById(id: string): Promise<TaskDetailEntity>
  getTaskDetailsByTaskId(taskId: string): Promise<TaskDetailEntity[]>
  updateTaskDetail(id: string, updateDto: UpdateTaskDetailDto): Promise<void>
}