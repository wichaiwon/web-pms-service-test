import { Tasks } from "src/domain/entities/task/task.entity"
import { CreateTaskDto } from "src/application/dto/tasks/create-task.dto"
import { UpdateTaskDto } from "src/application/dto/tasks/update-task.dto"

export interface ITaskService {
  createTask(createTaskDto: CreateTaskDto): Promise<Tasks>
  getTaskById(id: string): Promise<Tasks>
  getAllTasks(): Promise<Tasks[]>
  getTasksByCustomerId(customerId: string): Promise<Tasks[]>
  getTasksByResponsible(userId: string): Promise<Tasks[]>
  updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<void>
  getTasksByStatus(status: string): Promise<Tasks[]>
}