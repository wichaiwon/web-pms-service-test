import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDetailStepFourDto } from 'src/application/dto/tasks/task-detail-step-four/create-task-detail-step-four.dto'
import { UpdateTaskDetailStepFourDto } from 'src/application/dto/tasks/task-detail-step-four/update-task-detail-step-four.dto'
import { TaskDetailStepFourEntity } from 'src/domain/entities/task/task-detail-step-four/task-detail-step-four.entity'
import { ITaskDetailStepFourRepository } from 'src/domain/repositories/task/task-detail-step-four/task-detail-step-four.repository.interface'
import { Repository } from 'typeorm'

@Injectable()
export class TaskDetailFourRepository implements ITaskDetailStepFourRepository {
  constructor(
    @InjectRepository(TaskDetailStepFourEntity)
    private readonly taskDetailStepFourRepository: Repository<TaskDetailStepFourEntity>,
  ) {}

  async createTaskDetailStepFour(createDto: CreateTaskDetailStepFourDto): Promise<TaskDetailStepFourEntity> {
    const taskDetailStepFour = this.taskDetailStepFourRepository.create({
      ...createDto,
      success_flag: false,
    })
    return this.taskDetailStepFourRepository.save(taskDetailStepFour)
  }
  async getTaskDetailStepFourById(id: string): Promise<TaskDetailStepFourEntity> {
    const taskDetailStepFour = await this.taskDetailStepFourRepository.findOne({ where: { id } })
    if (!taskDetailStepFour) {
      throw new Error(`TaskDetailStepFour with id ${id} not found`)
    }
    return taskDetailStepFour
  }

  async getTaskDetailStepFourByTaskId(taskId: string): Promise<TaskDetailStepFourEntity[]> {
    return this.taskDetailStepFourRepository.find({
      where: { task_id: taskId },
      order: { created_at: 'DESC' },
    })
  }

  async updateTaskDetailStepFour(id: string, updateDto: UpdateTaskDetailStepFourDto): Promise<void> {
    const result = await this.taskDetailStepFourRepository.update(id, {
      ...updateDto,
      updated_at: new Date(),
    })
    if (result.affected === 0) {
      throw new Error(`TaskDetailStepFour with id ${id} not found`)
    }
  }
}
