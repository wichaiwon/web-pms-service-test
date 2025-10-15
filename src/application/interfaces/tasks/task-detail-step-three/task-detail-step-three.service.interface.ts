import { CreateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three.dto'
import { UpdateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/update-task-detail-step-three.dto'
import { TaskDetailStepThreeEntity } from 'src/domain/entities/task/task-detail-step-three/task-detail-step-three.entity'

export interface ITaskDetailStepThreeService {
  createTaskDetailStepThree(createDto: CreateTaskDetailStepThreeDto): Promise<TaskDetailStepThreeEntity>
  getTaskDetailStepThreeById(id: string): Promise<TaskDetailStepThreeEntity>
  getTaskDetailStepThreeByTaskId(taskId: string): Promise<TaskDetailStepThreeEntity[]>
  updateTaskDetailStepThree(id: string, updateDto: UpdateTaskDetailStepThreeDto): Promise<void>
}
