import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three.dto'
import { UpdateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/update-task-detail-step-three.dto'
import { TaskDetailStepThreeEntity } from 'src/domain/entities/task/task-detail-step-three/task-detail-step-three.entity'
import { ITaskDetailStepThreeRepository } from 'src/domain/repositories/task/task-detail-step-three/task-detail-step-three.repository'
import { Repository } from 'typeorm'

@Injectable()
export class TaskDetailStepThreeRepository implements ITaskDetailStepThreeRepository {
  constructor(
    @InjectRepository(TaskDetailStepThreeEntity)
    private readonly taskDetailStepThreeRepository: Repository<TaskDetailStepThreeEntity>,
  ) {}

  async createTaskDetailStepThree(createDto: CreateTaskDetailStepThreeDto): Promise<TaskDetailStepThreeEntity> {
    const taskDetailStepThree = this.taskDetailStepThreeRepository.create(createDto)
    return this.taskDetailStepThreeRepository.save(taskDetailStepThree)
  }

  async getTaskDetailStepThreeById(id: string): Promise<TaskDetailStepThreeEntity> {
    const taskDetailStepThree = await this.taskDetailStepThreeRepository.findOne({ where: { id } })
    if (!taskDetailStepThree) {
      throw new Error('TaskDetailStepThree not found')
    }
    return taskDetailStepThree
  }
  async getTaskDetailStepThreeByTaskId(taskId: string): Promise<TaskDetailStepThreeEntity[]> {
    return this.taskDetailStepThreeRepository.find({ where: { task_id: taskId }, order: { created_at: 'DESC' } })
  }

  async updateTaskDetailStepThree(id: string, updateDto: UpdateTaskDetailStepThreeDto): Promise<void> {
    const result = await this.taskDetailStepThreeRepository.update(id, {
      ...updateDto,
      updated_at: new Date(),
    })
    if (result.affected === 0) {
      throw new Error('TaskDetailStepThree not found or no changes made')
    }
  }
}
