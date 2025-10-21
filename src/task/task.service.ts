import { Injectable } from '@nestjs/common'
import { Tasks } from '../domain/entities/task/task.entity'
import { CreateTaskDto } from '../application/dto/tasks/create-task.dto'
import { UpdateTaskDto } from '../application/dto/tasks/update-task.dto'
import { ITaskService } from '../application/interfaces/tasks/task.service.interface'
import { CreateTaskUseCase } from './use-cases/create-task.use-case'
import { GetTaskUseCase } from './use-cases/get-task.use-case'
import { UpdateTaskUseCase } from './use-cases/update-task.use-case'
import { Branch } from '../shared/enum/user'
import { PatchTaskSuccessFlagDto } from 'src/application/dto/tasks/patch-task-success-flag'
import { PatchTaskInProcessFlagDto } from 'src/application/dto/tasks/patch-task-in-process-flag'
import { PatchTaskEngineChassisDto } from 'src/application/dto/tasks/patch-task-engine-chassis'

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTaskUseCase: GetTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.createTaskUseCase.execute(createTaskDto)
  }

  async getTaskById(id: string): Promise<Tasks> {
    return this.getTaskUseCase.execute(id)
  }

  async getAllTasks(): Promise<Tasks[]> {
    return this.getTaskUseCase.executeAll()
  }

  async getTasksByResponsible(userId: string): Promise<Tasks[]> {
    return this.getTaskUseCase.executeByResponsible(userId)
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<void> {
    return this.updateTaskUseCase.execute(id, updateTaskDto)
  }

  async getTasksByStatus(status: string): Promise<Tasks[]> {
    return this.getTaskUseCase.executeByStatus(status)
  }

  async getTasksByUserBranch(userId: string): Promise<Tasks[]> {
    return this.getTaskUseCase.executeByUserBranch(userId)
  }

  async getTasksByBranch(branch: Branch): Promise<Tasks[]> {
    return this.getTaskUseCase.executeByBranch(branch)
  }
  async patchTaskSuccessFlag(
    id: string,
    patchTaskSuccessFlagDto: PatchTaskSuccessFlagDto,
  ): Promise<void> {
    return this.updateTaskUseCase.execute(id, patchTaskSuccessFlagDto)
  }

  async patchTaskInProcessFlag(
    id: string,
    patchTaskInProcessFlagDto: PatchTaskInProcessFlagDto,
  ): Promise<void> {
    return this.updateTaskUseCase.execute(id, patchTaskInProcessFlagDto)
  }

  async patchTaskEngineChassis(
    id: string,
    patchTaskEngineChassisDto: PatchTaskEngineChassisDto,
  ): Promise<void> {
    return this.updateTaskUseCase.execute(id, patchTaskEngineChassisDto)
  }
}
