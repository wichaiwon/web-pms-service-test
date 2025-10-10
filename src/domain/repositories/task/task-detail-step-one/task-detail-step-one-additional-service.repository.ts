import { CreateTaskDetailStepOneAdditionalServiceDto } from "src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one-additional-service.dto"
import { UpdateTaskDetailStepOneAdditionalServiceDto } from "src/application/dto/tasks/task-detail-step-one/update-task-detail-step-one-additional-service.dto"
import { TaskDetailStepOneAdditionalService } from "src/domain/entities/task/task-detail-step-one/task-detail-step-one-additional-service.entity"

export interface ITaskDetailStepOneAdditionalServiceRepository {
  createTaskDetailStepOneAdditionalService(createDto: CreateTaskDetailStepOneAdditionalServiceDto): Promise<TaskDetailStepOneAdditionalService>
  getTaskDetailStepOneAdditionalServiceById(id: string): Promise<TaskDetailStepOneAdditionalService>
  getTaskDetailStepOneAdditionalServiceByTaskDetailStepOneId(taskDetailStepOneId: string): Promise<TaskDetailStepOneAdditionalService[]>
  updateTaskDetailStepOneAdditionalService(id: string, updateDto: UpdateTaskDetailStepOneAdditionalServiceDto): Promise<void>
}