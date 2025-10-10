import { CreateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two.dto'
import { UpdateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two.dto'
import { TaskDetailStepTwoEntity } from 'src/domain/entities/task/task-detail-step-two/task-detail-step-two.entity'

export interface ITaskDetailStepTwoRepository {
  createTaskDetailStepTwo(createDto: CreateTaskDetailStepTwoDto): Promise<TaskDetailStepTwoEntity>
  getTaskDetailStepTwoById(id: string): Promise<TaskDetailStepTwoEntity>
  getTaskDetailStepTwoByTaskId(taskId: string): Promise<TaskDetailStepTwoEntity[]>
  updateTaskDetailStepTwo(id: string, updateDto: UpdateTaskDetailStepTwoDto): Promise<void>
}
