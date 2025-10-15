import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateTaskDetailStepOneDto } from 'src/application/dto/tasks/task-detail-step-one/update-task-detail-step-one.dto'
import { TaskDetailStepOneEntity } from 'src/domain/entities/task/task-detail-step-one/task-detail-step-one.entity'
import { ITaskDetailStepOneRepository } from 'src/domain/repositories/task/task-detail-step-one/task-detail-step-one.repository.interface'
import { CreateTaskDetailStepOneDto } from 'src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one.dto'

@Injectable()
export class TaskDetailStepOneRepository implements ITaskDetailStepOneRepository {
  constructor(
    @InjectRepository(TaskDetailStepOneEntity)
    private readonly taskDetailStepOneRepository: Repository<TaskDetailStepOneEntity>
  ) {}

  async createTaskDetailStepOne(createDto: CreateTaskDetailStepOneDto): Promise<TaskDetailStepOneEntity> {
    const taskDetailStepOne = this.taskDetailStepOneRepository.create({
      ...createDto,
      success_flag: false
    })
    return this.taskDetailStepOneRepository.save(taskDetailStepOne)
  }

  async getTaskDetailStepOneById(id: string): Promise<TaskDetailStepOneEntity> {
    const taskDetailStepOne = await this.taskDetailStepOneRepository.findOne({ where: { id } })
    if (!taskDetailStepOne) {
      throw new Error(`TaskDetailStepOne with id ${id} not found`)
    }
    return taskDetailStepOne
  }

  async getTaskDetailStepOneByTaskId(taskId: string): Promise<TaskDetailStepOneEntity[]> {
    return this.taskDetailStepOneRepository.find({
      where: { task_id: taskId },
      order: { created_at: 'DESC' }
    })
  }

  async updateTaskDetailStepOne(id: string, updateDto: UpdateTaskDetailStepOneDto): Promise<void> {
    const result = await this.taskDetailStepOneRepository.update(id, {
      ...updateDto,
      updated_at: new Date()
    })
    
    if (result.affected === 0) {
      throw new Error(`TaskDetailStepOne with id ${id} not found`)
    }
  }
}