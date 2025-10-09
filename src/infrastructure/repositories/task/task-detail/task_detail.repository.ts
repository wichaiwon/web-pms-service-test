import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskDetail } from 'src/domain/entities/task/task-detail/task-detail.entity'
import { ITaskDetailRepository } from 'src/domain/repositories/task/task_detail/task_detail.repository.interface'
import { Repository } from 'typeorm'

@Injectable()
export class TaskDetailRepository implements ITaskDetailRepository {
  constructor(
    @InjectRepository(TaskDetail)
    private readonly taskDetailRepository: Repository<TaskDetail>
  ) {}

  async findById(id: string): Promise<TaskDetail | null> {
    return this.taskDetailRepository.findOne({ where: { id } })
  }

  async findByTaskId(taskId: string): Promise<TaskDetail[]> {
    return this.taskDetailRepository.find({ 
      where: { task_id: taskId },
      order: { created_at: 'DESC' }
    })
  }

  async create(taskDetailData: Partial<TaskDetail>): Promise<TaskDetail> {
    const taskDetail = this.taskDetailRepository.create({
      ...taskDetailData,
      success_flag: false,
      created_at: new Date()
    })
    return this.taskDetailRepository.save(taskDetail)
  }

  async update(id: string, taskDetailData: Partial<TaskDetail>): Promise<TaskDetail> {
    await this.taskDetailRepository.update(id, {
      ...taskDetailData,
      updated_at: new Date()
    })
    const updated = await this.findById(id)
    if (!updated) {
      throw new Error(`TaskDetail with id ${id} not found`)
    }
    return updated
  }
}