import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Tasks } from 'src/domain/entities/task/task.entity'
import { ITaskRepository } from 'src/domain/repositories/task/task.repository.interface'
import { Repository } from 'typeorm'

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(Tasks)
    private readonly taskRepository: Repository<Tasks>,
  ) {}

  async findById(id: string): Promise<Tasks | null> {
    return this.taskRepository.findOne({ where: { id } })
  }

  async findAll(): Promise<Tasks[]> {
    return this.taskRepository.find({
      order: { created_at: 'DESC' },
    })
  }

  async findByCustomerId(customerId: string): Promise<Tasks[]> {
    return this.taskRepository.find({
      where: { customer_id: customerId },
      order: { created_at: 'DESC' },
    })
  }

  async findByResponsible(userId: string): Promise<Tasks[]> {
    return this.taskRepository
      .createQueryBuilder('task')
      .where(':userId = ANY(task.responsible)', { userId })
      .orderBy('task.created_at', 'DESC')
      .getMany()
  }

  async create(taskData: Partial<Tasks>): Promise<Tasks> {
    const task = this.taskRepository.create({
      ...taskData,
      success_flag: false,
    })
    return this.taskRepository.save(task)
  }

  async update(id: string, taskData: Partial<Tasks>): Promise<Tasks> {
    await this.taskRepository.update(id, {
      ...taskData,
      updated_at: new Date(),
    })
    const updatedTask = await this.findById(id)
    if (!updatedTask) {
      throw new Error(`Task with id ${id} not found`)
    }
    return updatedTask
  }

  async findByStatus(status: string): Promise<Tasks[]> {
    return this.taskRepository.find({
      where: [{ status_repair_order: status as any }, { status_report: status as any }],
      order: { created_at: 'DESC' },
    })
  }
}
