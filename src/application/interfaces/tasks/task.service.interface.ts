import { Tasks } from 'src/domain/entities/task/task.entity'
import { CreateTaskDto } from 'src/application/dto/tasks/create-task.dto'
import { UpdateTaskDto } from 'src/application/dto/tasks/update-task.dto'
import { Branch } from 'src/shared/enum/user'

export interface ITaskService {
  createTask(createTaskDto: CreateTaskDto): Promise<Tasks>
  getTaskById(id: string): Promise<Tasks>
  getAllTasks(): Promise<Tasks[]>
  getTasksByResponsible(userId: string): Promise<Tasks[]>
  getTasksByUserBranch(userId: string): Promise<Tasks[]>
  getTasksByBranch(branch: Branch): Promise<Tasks[]>
  updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<void>
  getTasksByStatus(status: string): Promise<Tasks[]>
}
