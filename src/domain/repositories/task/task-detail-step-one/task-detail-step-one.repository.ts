import { CreateTaskDetailStepOneDto } from "src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one.dto"
import { UpdateTaskDetailStepOneDto } from "src/application/dto/tasks/task-detail-step-one/update-task-detail-step-one.dto"
import { TaskDetailStepOneEntity } from "src/domain/entities/task/task-detail-step-one/task-detail-step-one.entity"

export interface ITaskDetailStepOneRepository {
  createTaskDetailStepOne(createDto: CreateTaskDetailStepOneDto): Promise<TaskDetailStepOneEntity>
  getTaskDetailStepOneById(id: string): Promise<TaskDetailStepOneEntity>
  getTaskDetailStepOneByTaskId(taskId: string): Promise<TaskDetailStepOneEntity[]>
  updateTaskDetailStepOne(id: string, updateDto: UpdateTaskDetailStepOneDto): Promise<void>
}
