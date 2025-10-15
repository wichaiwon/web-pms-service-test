import { CreateTaskDetailStepOneAdditionalServiceDto } from "src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one-additional-service.dto"
import { UpdateTaskDetailStepOneAdditionalServiceDto } from "src/application/dto/tasks/task-detail-step-one/update-task-detail-step-one-additional-service.dto"
import { TaskDetailStepOneAdditionalServiceEntity } from "src/domain/entities/task/task-detail-step-one/task-detail-step-one-additional-service.entity"

export interface ITaskDetailStepOneAdditionalServiceService {
  createTaskDetailStepOneAdditionalService(
    createDto: CreateTaskDetailStepOneAdditionalServiceDto,
  ): Promise<TaskDetailStepOneAdditionalServiceEntity>
  getTaskDetailStepOneAdditionalServiceById(id: string): Promise<TaskDetailStepOneAdditionalServiceEntity>
  getTaskDetailStepOneAdditionalServiceByTaskDetailId(taskDetailId: string): Promise<TaskDetailStepOneAdditionalServiceEntity[]>
  updateTaskDetailStepOneAdditionalService(id: string, updateDto: UpdateTaskDetailStepOneAdditionalServiceDto): Promise<void>
}
