import { CreateTaskDetailStepOneDto } from "src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one.dto"
import { UpdateTaskDetailStepOneDto } from "src/application/dto/tasks/task-detail-step-one/update-task-detail-step-one.dto"
import { TaskDetailStepOne } from "src/domain/entities/task/task-detail-step-one/task-detail-step-one.entity"

export interface ITaskDetailStepOneRepository {
  createTaskDetailStepOne(createDto: CreateTaskDetailStepOneDto): Promise<TaskDetailStepOne>
  getTaskDetailStepOneById(id: string): Promise<TaskDetailStepOne>
  getTaskDetailStepOneByTaskId(taskId: string): Promise<TaskDetailStepOne[]>
  updateTaskDetailStepOne(id: string, updateDto: UpdateTaskDetailStepOneDto): Promise<void>
}
