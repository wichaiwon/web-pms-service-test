import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDto } from 'src/application/dto/tasks/create-task.dto'
import { PatchTaskEngineChassisDto } from 'src/application/dto/tasks/patch-task-engine-chassis'
import { PatchTaskInProcessFlagDto } from 'src/application/dto/tasks/patch-task-in-process-flag'
import { PatchTaskSuccessFlagDto } from 'src/application/dto/tasks/patch-task-success-flag'
import { UpdateTaskDto } from 'src/application/dto/tasks/update-task.dto'
import { Tasks } from 'src/domain/entities/task/task.entity'
import { ITaskRepository } from 'src/domain/repositories/task/task.repository.interface'
import { StatusRepairOrder, StatusReport } from 'src/shared/enum/task'
import { Branch } from 'src/shared/enum/user'
import { Repository } from 'typeorm'

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(Tasks)
    private readonly taskRepository: Repository<Tasks>,
  ) {}

  async getTaskById(id: string): Promise<Tasks> {
    const task = await this.taskRepository.findOne({ where: { id } })
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }
    return task
  }

  async getTasks(): Promise<Tasks[]> {
    return this.taskRepository.find({
      order: { created_at: 'DESC' },
    })
  }

  async getTaskByResponsible(userId: string): Promise<Tasks[]> {
    return this.taskRepository
      .createQueryBuilder('task')
      .where(':userId = ANY(task.responsible)', { userId })
      .orderBy('task.created_at', 'DESC')
      .getMany()
  }

  async getTasksByBranch(branch: Branch): Promise<Tasks[]> {
    // Get today's date in YYYY-MM-DD format
    const today = new Date()
    const todayString = today.toISOString().split('T')[0]

    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.branch_booked = :branch', { branch })
      .andWhere('task.date_booked = :today', { today: todayString })
      .orderBy('task.created_at', 'DESC')
      .getMany()
  }

  async createTask(createDto: CreateTaskDto): Promise<Tasks> {
    const task = this.taskRepository.create({
      ...createDto,
      success_flag: false,
    })
    return this.taskRepository.save(task)
  }

  async updateTask(id: string, updateDto: UpdateTaskDto): Promise<void> {
    const result = await this.taskRepository.update(id, {
      ...updateDto,
    })
    if (result.affected === 0) {
      throw new Error(`Task with id ${id} not found`)
    }
  }

  async getTaskByStatus(status: string): Promise<Tasks[]> {
    return this.taskRepository.find({
      where: [{ status_repair_order: status as StatusRepairOrder }, { status_report: status as StatusReport }],
      order: { created_at: 'DESC' },
    })
  }

  async findByAppointmentRunning(appointmentRunning: string): Promise<Tasks | null> {
    return this.taskRepository.findOne({
      where: { appointment_running: appointmentRunning },
    })
  }
  async patchTaskSuccessFlag(id: string, patchTaskSuccessFlagDto: PatchTaskSuccessFlagDto): Promise<void> {
    const result = await this.taskRepository.update(id, {
      ...patchTaskSuccessFlagDto,
    })
    if (result.affected === 0) {
      throw new Error(`Task with id ${id} not found`)
    }
  }
  async patchTaskInProcessFlag(id: string, patchTaskInProcessFlagDto: PatchTaskInProcessFlagDto): Promise<void> {
    const result = await this.taskRepository.update(id, {
      ...patchTaskInProcessFlagDto,
    })
    if (result.affected === 0) {
      throw new Error(`Task with id ${id} not found`)
    }
  }
  async patchTaskEngineChassis(id: string, patchTaskEngineChassisDto: PatchTaskEngineChassisDto): Promise<void> {
    const result = await this.taskRepository.update(id, {
      ...patchTaskEngineChassisDto,
    })
    if (result.affected === 0) {
      throw new Error(`Task with id ${id} not found`)
    }
  }
}
