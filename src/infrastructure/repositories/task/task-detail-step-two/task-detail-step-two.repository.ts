import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two.dto'
import { UpdateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two.dto'
import { TaskDetailStepTwoEntity } from 'src/domain/entities/task/task-detail-step-two/task-detail-step-two.entity'
import { ITaskDetailStepTwoRepository } from 'src/domain/repositories/task/task-detail-step-two/task-detail-step-two.repository.interface'
import { Repository } from 'typeorm'

@Injectable()
export class TaskDetailStepTwoRepository implements ITaskDetailStepTwoRepository {
  constructor(
    @InjectRepository(TaskDetailStepTwoEntity)
    private readonly taskDetailStepTwoRepository: Repository<TaskDetailStepTwoEntity>,
  ) {}

  async createTaskDetailStepTwo(createDto: CreateTaskDetailStepTwoDto): Promise<TaskDetailStepTwoEntity> {
    const taskDetailStepTwo = this.taskDetailStepTwoRepository.create({ ...createDto, success_flag: false })
    return this.taskDetailStepTwoRepository.save(taskDetailStepTwo)
  }

  async getTaskDetailStepTwoById(id: string): Promise<TaskDetailStepTwoEntity> {
    const taskDetailStepTwo = await this.taskDetailStepTwoRepository.findOne({ where: { id } })
    if (!taskDetailStepTwo) {
      throw new Error('TaskDetailStepTwo not found')
    }
    return taskDetailStepTwo
  }

  async getTaskDetailStepTwoByTaskId(taskId: string): Promise<TaskDetailStepTwoEntity[]> {
    return this.taskDetailStepTwoRepository.find({ where: { task_id: taskId }, order: { created_at: 'DESC' } })
  }

  async updateTaskDetailStepTwo(id: string, updateDto: UpdateTaskDetailStepTwoDto): Promise<void> {
    const result = await this.taskDetailStepTwoRepository.update(id, {
      ...updateDto,
      updated_at: new Date(),
    })
    if (result.affected === 0) {
      throw new Error('TaskDetailStepTwo not found or no changes made')
    }
  }
}
