import { CreateTaskDetailStepFourDto } from 'src/application/dto/tasks/task-detail-step-four/create-task-detail-step-four.dto'
import { UpdateTaskDetailStepFourDto } from 'src/application/dto/tasks/task-detail-step-four/update-task-detail-step-four.dto'
import { TaskDetailStepFourEntity } from 'src/domain/entities/task/task-detail-step-four/task-detail-step-four.entity'

export interface ITaskDetailStepFourService {
  createTaskDetailStepFour(createDto: CreateTaskDetailStepFourDto): Promise<TaskDetailStepFourEntity>
  getTaskDetailStepFourById(id: string): Promise<TaskDetailStepFourEntity>
  getTaskDetailStepFourByTaskId(taskId: string): Promise<TaskDetailStepFourEntity[]>
  updateTaskDetailStepFour(id: string, updateDto: UpdateTaskDetailStepFourDto): Promise<void>
}
