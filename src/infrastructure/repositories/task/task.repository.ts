import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDto } from 'src/application/dto/tasks/create-task.dto'
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
      updated_at: new Date(),
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

  async getAllActiveTasksWithAppointment(): Promise<Tasks[]> {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.is_active = :isActive', { isActive: true })
      .andWhere('task.appointment_running IS NOT NULL')
      .andWhere('task.appointment_running != :empty', { empty: '' })
      .getMany()
  }

  async findPendingTaskByVinNumber(vinNumber: string): Promise<Tasks | null> {
    return this.taskRepository.findOne({
      where: {
        vin_number: vinNumber,
        status_repair_order: StatusRepairOrder.NOT_OPENED,
        status_report: StatusReport.NOT_ISSUED,
      },
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
  

  async getTaskByIdWithAllDetails(id: string): Promise<Tasks> {
    const task = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect(
        'task_detail',
        'taskDetail',
        'taskDetail.task_id = task.id AND taskDetail.success_flag = false AND taskDetail.is_active = true',
      )
      .leftJoinAndSelect(
        'task_detail_step_one',
        'taskDetailStepOne',
        'taskDetailStepOne.task_id = task.id AND taskDetailStepOne.success_flag = false AND taskDetailStepOne.is_active = true',
      )
      .leftJoinAndSelect(
        'task_detail_step_two',
        'taskDetailStepTwo',
        'taskDetailStepTwo.task_id = task.id AND taskDetailStepTwo.success_flag = false AND taskDetailStepTwo.is_active = true',
      )
      .leftJoinAndSelect(
        'task_detail_step_three',
        'taskDetailStepThree',
        'taskDetailStepThree.task_id = task.id AND taskDetailStepThree.success_flag = false',
      )
      .leftJoinAndSelect(
        'task_detail_step_four',
        'taskDetailStepFour',
        'taskDetailStepFour.task_id = task.id AND taskDetailStepFour.success_flag = false',
      )
      .where('task.id = :id', { id })
      .andWhere('task.success_flag = false')
      .andWhere('task.is_active = true')
      .getRawAndEntities()
      .then((result) => {
        if (!result.entities || result.entities.length === 0) {
          throw new Error(`Task with id ${id} not found or does not meet criteria`)
        }

        const task = result.entities[0]
        const raw = result.raw

        return {
          ...task,
          taskDetail: raw
            .filter((r: any) => r.taskDetail_id)
            .map((r: any) => ({
              id: r.taskDetail_id,
              task_id: r.taskDetail_task_id,
              task_detail_image1: r.taskDetail_task_detail_image1,
              task_detail_image2: r.taskDetail_task_detail_image2,
              car_mileage: r.taskDetail_car_mileage,
              fuel_level: r.taskDetail_fuel_level,
              success_flag: r.taskDetail_success_flag,
              is_active: r.taskDetail_is_active,
              created_at: r.taskDetail_created_at,
              created_by: r.taskDetail_created_by,
              updated_at: r.taskDetail_updated_at,
              updated_by: r.taskDetail_updated_by,
            })),
          taskDetailStepOne: raw
            .filter((r: any) => r.taskDetailStepOne_id)
            .map((r: any) => ({
              id: r.taskDetailStepOne_id,
              task_id: r.taskDetailStepOne_task_id,
              damage_car: r.taskDetailStepOne_damage_car,
              damage_car_image: r.taskDetailStepOne_damage_car_image,
              success_flag: r.taskDetailStepOne_success_flag,
              is_active: r.taskDetailStepOne_is_active,
              created_at: r.taskDetailStepOne_created_at,
              created_by: r.taskDetailStepOne_created_by,
              updated_at: r.taskDetailStepOne_updated_at,
              updated_by: r.taskDetailStepOne_updated_by,
            })),
          taskDetailStepTwo: raw
            .filter((r: any) => r.taskDetailStepTwo_id)
            .map((r: any) => ({
              id: r.taskDetailStepTwo_id,
              task_id: r.taskDetailStepTwo_task_id,
              spare_tire: r.taskDetailStepTwo_spare_tire,
              wheel_control_cover: r.taskDetailStepTwo_wheel_control_cover,
              cargo: r.taskDetailStepTwo_cargo,
              truck_tool_set: r.taskDetailStepTwo_truck_tool_set,
              left_front_tire_year: r.taskDetailStepTwo_left_front_tire_year,
              right_front_tire_year: r.taskDetailStepTwo_right_front_tire_year,
              left_back_tire_year: r.taskDetailStepTwo_left_back_tire_year,
              right_back_tire_year: r.taskDetailStepTwo_right_back_tire_year,
              left_front_tire_pressure: r.taskDetailStepTwo_left_front_tire_pressure,
              right_front_tire_pressure: r.taskDetailStepTwo_right_front_tire_pressure,
              left_back_tire_pressure: r.taskDetailStepTwo_left_back_tire_pressure,
              right_back_tire_pressure: r.taskDetailStepTwo_right_back_tire_pressure,
              left_front_tire_depth: r.taskDetailStepTwo_left_front_tire_depth,
              right_front_tire_depth: r.taskDetailStepTwo_right_front_tire_depth,
              left_back_tire_depth: r.taskDetailStepTwo_left_back_tire_depth,
              right_back_tire_depth: r.taskDetailStepTwo_right_back_tire_depth,
              left_front_tire_condition: r.taskDetailStepTwo_left_front_tire_condition,
              right_front_tire_condition: r.taskDetailStepTwo_right_front_tire_condition,
              left_back_tire_condition: r.taskDetailStepTwo_left_back_tire_condition,
              right_back_tire_condition: r.taskDetailStepTwo_right_back_tire_condition,
              left_front_tire_damage: r.taskDetailStepTwo_left_front_tire_damage,
              right_front_tire_damage: r.taskDetailStepTwo_right_front_tire_damage,
              left_back_tire_damage: r.taskDetailStepTwo_left_back_tire_damage,
              right_back_tire_damage: r.taskDetailStepTwo_right_back_tire_damage,
              success_flag: r.taskDetailStepTwo_success_flag,
              is_active: r.taskDetailStepTwo_is_active,
              created_at: r.taskDetailStepTwo_created_at,
              created_by: r.taskDetailStepTwo_created_by,
              updated_at: r.taskDetailStepTwo_updated_at,
              updated_by: r.taskDetailStepTwo_updated_by,
            })),
          taskDetailStepThree: raw
            .filter((r: any) => r.taskDetailStepThree_id)
            .map((r: any) => ({
              id: r.taskDetailStepThree_id,
              task_id: r.taskDetailStepThree_task_id,
              first_battery_voltage: r.taskDetailStepThree_first_battery_voltage,
              first_measurement: r.taskDetailStepThree_first_measurement,
              first_rating: r.taskDetailStepThree_first_rating,
              second_battery_voltage: r.taskDetailStepThree_second_battery_voltage,
              second_measurement: r.taskDetailStepThree_second_measurement,
              second_rating: r.taskDetailStepThree_second_rating,
              success_flag: r.taskDetailStepThree_success_flag,
              created_at: r.taskDetailStepThree_created_at,
              created_by: r.taskDetailStepThree_created_by,
              updated_at: r.taskDetailStepThree_updated_at,
              updated_by: r.taskDetailStepThree_updated_by,
            })),
          taskDetailStepFour: raw
            .filter((r: any) => r.taskDetailStepFour_id)
            .map((r: any) => ({
              id: r.taskDetailStepFour_id,
              task_id: r.taskDetailStepFour_task_id,
              signature_customer: r.taskDetailStepFour_signature_customer,
              signature_status: r.taskDetailStepFour_signature_status,
              customer_absent_flag: r.taskDetailStepFour_customer_absent_flag,
              success_flag: r.taskDetailStepFour_success_flag,
              created_at: r.taskDetailStepFour_created_at,
              created_by: r.taskDetailStepFour_created_by,
              updated_at: r.taskDetailStepFour_updated_at,
              updated_by: r.taskDetailStepFour_updated_by,
            })),
        }
      })

    return task
  }

  async getAllTasksWithCompleteDetails(): Promise<Tasks[]> {
    const tasks = await this.taskRepository
      .createQueryBuilder('task')
      .innerJoinAndSelect(
        'task_detail',
        'taskDetail',
        'taskDetail.task_id = task.id AND taskDetail.success_flag = false AND taskDetail.is_active = true',
      )
      .innerJoinAndSelect(
        'task_detail_step_one',
        'taskDetailStepOne',
        'taskDetailStepOne.task_id = task.id AND taskDetailStepOne.success_flag = false AND taskDetailStepOne.is_active = true',
      )
      .innerJoinAndSelect(
        'task_detail_step_two',
        'taskDetailStepTwo',
        'taskDetailStepTwo.task_id = task.id AND taskDetailStepTwo.success_flag = false AND taskDetailStepTwo.is_active = true',
      )
      .innerJoinAndSelect(
        'task_detail_step_three',
        'taskDetailStepThree',
        'taskDetailStepThree.task_id = task.id AND taskDetailStepThree.success_flag = false',
      )
      .innerJoinAndSelect(
        'task_detail_step_four',
        'taskDetailStepFour',
        'taskDetailStepFour.task_id = task.id AND taskDetailStepFour.success_flag = false',
      )
      .where('task.success_flag = false')
      .andWhere('task.is_active = true')
      .orderBy('task.created_at', 'DESC')
      .getRawAndEntities()
      .then((result) => {
        if (!result.entities || result.entities.length === 0) {
          return []
        }

        const taskMap = new Map<string, any>()

        result.raw.forEach((row: any) => {
          const taskId = row.task_id

          if (!taskMap.has(taskId)) {
            const task = result.entities.find((e) => e.id === taskId)
            if (task) {
              taskMap.set(taskId, {
                ...task,
                taskDetail: [],
                taskDetailStepOne: [],
                taskDetailStepTwo: [],
                taskDetailStepThree: [],
                taskDetailStepFour: [],
              })
            }
          }

          const taskData = taskMap.get(taskId)
          if (!taskData) return

          // Add task_detail
          if (row.taskDetail_id && !taskData.taskDetail.find((t: any) => t.id === row.taskDetail_id)) {
            taskData.taskDetail.push({
              id: row.taskDetail_id,
              task_id: row.taskDetail_task_id,
              task_detail_image1: row.taskDetail_task_detail_image1,
              task_detail_image2: row.taskDetail_task_detail_image2,
              car_mileage: row.taskDetail_car_mileage,
              fuel_level: row.taskDetail_fuel_level,
              success_flag: row.taskDetail_success_flag,
              is_active: row.taskDetail_is_active,
              created_at: row.taskDetail_created_at,
              created_by: row.taskDetail_created_by,
              updated_at: row.taskDetail_updated_at,
              updated_by: row.taskDetail_updated_by,
            })
          }

          // Add task_detail_step_one
          if (row.taskDetailStepOne_id && !taskData.taskDetailStepOne.find((t: any) => t.id === row.taskDetailStepOne_id)) {
            taskData.taskDetailStepOne.push({
              id: row.taskDetailStepOne_id,
              task_id: row.taskDetailStepOne_task_id,
              damage_car: row.taskDetailStepOne_damage_car,
              damage_car_image: row.taskDetailStepOne_damage_car_image,
              success_flag: row.taskDetailStepOne_success_flag,
              is_active: row.taskDetailStepOne_is_active,
              created_at: row.taskDetailStepOne_created_at,
              created_by: row.taskDetailStepOne_created_by,
              updated_at: row.taskDetailStepOne_updated_at,
              updated_by: row.taskDetailStepOne_updated_by,
            })
          }

          // Add task_detail_step_two
          if (row.taskDetailStepTwo_id && !taskData.taskDetailStepTwo.find((t: any) => t.id === row.taskDetailStepTwo_id)) {
            taskData.taskDetailStepTwo.push({
              id: row.taskDetailStepTwo_id,
              task_id: row.taskDetailStepTwo_task_id,
              spare_tire: row.taskDetailStepTwo_spare_tire,
              wheel_control_cover: row.taskDetailStepTwo_wheel_control_cover,
              cargo: row.taskDetailStepTwo_cargo,
              truck_tool_set: row.taskDetailStepTwo_truck_tool_set,
              left_front_tire_year: row.taskDetailStepTwo_left_front_tire_year,
              right_front_tire_year: row.taskDetailStepTwo_right_front_tire_year,
              left_back_tire_year: row.taskDetailStepTwo_left_back_tire_year,
              right_back_tire_year: row.taskDetailStepTwo_right_back_tire_year,
              left_front_tire_pressure: row.taskDetailStepTwo_left_front_tire_pressure,
              right_front_tire_pressure: row.taskDetailStepTwo_right_front_tire_pressure,
              left_back_tire_pressure: row.taskDetailStepTwo_left_back_tire_pressure,
              right_back_tire_pressure: row.taskDetailStepTwo_right_back_tire_pressure,
              left_front_tire_depth: row.taskDetailStepTwo_left_front_tire_depth,
              right_front_tire_depth: row.taskDetailStepTwo_right_front_tire_depth,
              left_back_tire_depth: row.taskDetailStepTwo_left_back_tire_depth,
              right_back_tire_depth: row.taskDetailStepTwo_right_back_tire_depth,
              left_front_tire_condition: row.taskDetailStepTwo_left_front_tire_condition,
              right_front_tire_condition: row.taskDetailStepTwo_right_front_tire_condition,
              left_back_tire_condition: row.taskDetailStepTwo_left_back_tire_condition,
              right_back_tire_condition: row.taskDetailStepTwo_right_back_tire_condition,
              left_front_tire_damage: row.taskDetailStepTwo_left_front_tire_damage,
              right_front_tire_damage: row.taskDetailStepTwo_right_front_tire_damage,
              left_back_tire_damage: row.taskDetailStepTwo_left_back_tire_damage,
              right_back_tire_damage: row.taskDetailStepTwo_right_back_tire_damage,
              success_flag: row.taskDetailStepTwo_success_flag,
              is_active: row.taskDetailStepTwo_is_active,
              created_at: row.taskDetailStepTwo_created_at,
              created_by: row.taskDetailStepTwo_created_by,
              updated_at: row.taskDetailStepTwo_updated_at,
              updated_by: row.taskDetailStepTwo_updated_by,
            })
          }

          // Add task_detail_step_three
          if (row.taskDetailStepThree_id && !taskData.taskDetailStepThree.find((t: any) => t.id === row.taskDetailStepThree_id)) {
            taskData.taskDetailStepThree.push({
              id: row.taskDetailStepThree_id,
              task_id: row.taskDetailStepThree_task_id,
              first_battery_voltage: row.taskDetailStepThree_first_battery_voltage,
              first_measurement: row.taskDetailStepThree_first_measurement,
              first_rating: row.taskDetailStepThree_first_rating,
              second_battery_voltage: row.taskDetailStepThree_second_battery_voltage,
              second_measurement: row.taskDetailStepThree_second_measurement,
              second_rating: row.taskDetailStepThree_second_rating,
              success_flag: row.taskDetailStepThree_success_flag,
              created_at: row.taskDetailStepThree_created_at,
              created_by: row.taskDetailStepThree_created_by,
              updated_at: row.taskDetailStepThree_updated_at,
              updated_by: row.taskDetailStepThree_updated_by,
            })
          }

          // Add task_detail_step_four
          if (row.taskDetailStepFour_id && !taskData.taskDetailStepFour.find((t: any) => t.id === row.taskDetailStepFour_id)) {
            taskData.taskDetailStepFour.push({
              id: row.taskDetailStepFour_id,
              task_id: row.taskDetailStepFour_task_id,
              signature_customer: row.taskDetailStepFour_signature_customer,
              signature_status: row.taskDetailStepFour_signature_status,
              customer_absent_flag: row.taskDetailStepFour_customer_absent_flag,
              success_flag: row.taskDetailStepFour_success_flag,
              created_at: row.taskDetailStepFour_created_at,
              created_by: row.taskDetailStepFour_created_by,
              updated_at: row.taskDetailStepFour_updated_at,
              updated_by: row.taskDetailStepFour_updated_by,
            })
          }
        })

        return Array.from(taskMap.values())
      })

    return tasks
  }

  async getTasksWithCompleteInfoByBranch(branch: Branch): Promise<Tasks[]> {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.vin_number IS NOT NULL')
      .andWhere('task.engine_number IS NOT NULL')
      .andWhere('task.chassis_number IS NOT NULL')
      .andWhere('task.car_type IS NOT NULL')
      .andWhere('task.car_brand IS NOT NULL')
      .andWhere('task.is_active = :isActive', { isActive: true })
      .andWhere('task.branch_booked = :branch', { branch })
      .orderBy('task.created_at', 'DESC')
      .getMany()
  }

  async getTasksWithIncompleteInfoByBranch(branch: Branch): Promise<Tasks[]> {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('(task.vin_number IS NULL OR task.engine_number IS NULL OR task.chassis_number IS NULL OR task.car_type IS NULL OR task.car_brand IS NULL)')
      .andWhere('task.is_active = :isActive', { isActive: true })
      .andWhere('task.branch_booked = :branch', { branch })
      .orderBy('task.created_at', 'DESC')
      .getMany()
  }
}
