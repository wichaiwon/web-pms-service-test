import { Tasks } from "src/domain/entities/task/task.entity"


export interface ITaskRepository {
  findById(id: string): Promise<Tasks | null>
  findAll(): Promise<Tasks[]>
  findByCustomerId(customerId: string): Promise<Tasks[]>
  findByResponsible(userId: string): Promise<Tasks[]>
  create(task: Partial<Tasks>): Promise<Tasks>
  update(id: string, task: Partial<Tasks>): Promise<Tasks>
  findByStatus(status: string): Promise<Tasks[]>
}
