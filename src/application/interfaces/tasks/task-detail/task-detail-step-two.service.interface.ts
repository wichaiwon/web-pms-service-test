import { CreateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two.dto'
import { TaskDetailStepTwoEntity } from 'src/domain/entities/task/task-detail-step-two/task-detail-step-two.entity'

export interface ITaskDetailStepTwoService {
  createTaskDetailStepTwo(taskDetailStepTwo: CreateTaskDetailStepTwoDto): Promise<TaskDetailStepTwoEntity>
  getTaskDetailStepTwoById(id: string): Promise<TaskDetailStepTwoEntity>
  getTaskDetailStepTwoByTaskId(taskId: string): Promise<TaskDetailStepTwoEntity[]>
}
