import { CreateTaskDto } from 'src/application/dto/tasks/create-task.dto'
import { UpdateTaskDto } from 'src/application/dto/tasks/update-task.dto'
import { Tasks } from 'src/domain/entities/task/task.entity'
import { Branch } from 'src/shared/enum/user'

export interface ITaskRepository {
  getTaskById(id: string): Promise<Tasks>
  getTasks(): Promise<Tasks[]>
  getTaskByResponsible(userId: string): Promise<Tasks[]>
  getTasksByBranch(branch: Branch): Promise<Tasks[]>
  createTask(createDto: CreateTaskDto): Promise<Tasks>
  updateTask(id: string, updateDto: UpdateTaskDto): Promise<void>
  getTaskByStatus(status: string): Promise<Tasks[]>
  findByAppointmentRunning(appointmentRunning: string): Promise<Tasks | null>
}
