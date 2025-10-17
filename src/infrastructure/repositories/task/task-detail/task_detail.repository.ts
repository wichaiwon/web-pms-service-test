import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskDetailEntity } from 'src/domain/entities/task/task-detail/task-detail.entity'
import { ITaskDetailRepository } from 'src/domain/repositories/task/task-detail/task-detail.repository.interface'
import { CreateTaskDetailDto } from 'src/application/dto/tasks/task-detail/create-task-detail.dto'
import { UpdateTaskDetailDto } from 'src/application/dto/tasks/task-detail/update-task-detail.dto'
import { Repository } from 'typeorm'

@Injectable()
export class TaskDetailRepository implements ITaskDetailRepository {
  constructor(
    @InjectRepository(TaskDetailEntity)
    private readonly taskDetailRepository: Repository<TaskDetailEntity>,
  ) {}

  async createTaskDetail(taskDetail: CreateTaskDetailDto): Promise<TaskDetailEntity> {
    const created = this.taskDetailRepository.create({
      ...taskDetail,
      success_flag: false,
    })
    return this.taskDetailRepository.save(created)
  }

  async getTaskDetailById(id: string): Promise<TaskDetailEntity> {
    const result = await this.taskDetailRepository.findOne({ where: { id } })
    if (!result) {
      throw new Error(`TaskDetail with id ${id} not found`)
    }
    return result
  }

  async getTaskDetailByTaskId(taskId: string): Promise<TaskDetailEntity[]> {
    return this.taskDetailRepository.find({
      where: { task_id: taskId },
      order: { created_at: 'DESC' },
    })
  }

  async updateTaskDetail(id: string, taskDetail: UpdateTaskDetailDto): Promise<void> {
    await this.taskDetailRepository.update(id, {
      ...taskDetail,
      updated_at: new Date(),
    })
  }

  async findById(id: string): Promise<TaskDetailEntity | null> {
    return this.taskDetailRepository.findOne({ where: { id } })
  }

  async findByTaskId(taskId: string): Promise<TaskDetailEntity[]> {
    return this.taskDetailRepository.find({
      where: { task_id: taskId },
      order: { created_at: 'DESC' },
    })
  }

  async create(taskDetailData: Partial<TaskDetailEntity>): Promise<TaskDetailEntity> {
    const taskDetail = this.taskDetailRepository.create({
      ...taskDetailData,
      success_flag: false,
    })
    return this.taskDetailRepository.save(taskDetail)
  }

  async update(id: string, taskDetailData: Partial<TaskDetailEntity>): Promise<TaskDetailEntity> {
    await this.taskDetailRepository.update(id, {
      ...taskDetailData,
      updated_at: new Date(),
    })
    const updated = await this.findById(id)
    if (!updated) {
      throw new Error(`TaskDetail with id ${id} not found`)
    }
    return updated
  }
}
