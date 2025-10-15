import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDto } from 'src/application/dto/tasks/create-task.dto'
import { UpdateTaskDto } from 'src/application/dto/tasks/update-task.dto'
import { Tasks } from 'src/domain/entities/task/task.entity'
import { ITaskRepository } from 'src/domain/repositories/task/task.repository.interface'
import { Repository } from 'typeorm'

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(Tasks)
    private readonly taskRepository: Repository<Tasks>,
  ) {}

  async getTaskById(id: string): Promise<Tasks> {
    const task = await this.taskRepository.findOne({ where: { id } })
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }
    return task
  }

  async getTasks(): Promise<Tasks[]> {
    return this.taskRepository.find({
      order: { created_at: 'DESC' },
    })
  }

  async getTaskByCustomerId(customerId: string): Promise<Tasks[]> {
    return this.taskRepository.find({
      where: { customer_id: customerId },
      order: { created_at: 'DESC' },
    })
  }

  async getTaskByResponsible(userId: string): Promise<Tasks[]> {
    return this.taskRepository
      .createQueryBuilder('task')
      .where(':userId = ANY(task.responsible)', { userId })
      .orderBy('task.created_at', 'DESC')
      .getMany()
  }

  async createTask(createDto: CreateTaskDto): Promise<Tasks> {
    const task = this.taskRepository.create({
      ...createDto,
      success_flag: false,
    })
    return this.taskRepository.save(task)
  }

  async updateTask(id: string, updateDto: UpdateTaskDto): Promise<void> {
    const result = await this.taskRepository.update(id, {
      ...updateDto,
      updated_at: new Date(),
    })
    if (result.affected === 0) {
      throw new Error(`Task with id ${id} not found`)
    }
  }

  async getTaskByStatus(status: string): Promise<Tasks[]> {
    return this.taskRepository.find({
      where: [{ status_repair_order: status as any }, { status_report: status as any }],
      order: { created_at: 'DESC' },
    })
  }
}
