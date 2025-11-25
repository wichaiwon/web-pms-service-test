import { Injectable, Inject, BadRequestException } from '@nestjs/common'
import { Tasks } from '../../domain/entities/task/task.entity'
import type { ITaskRepository } from '../../domain/repositories/task/task.repository.interface'
import { CreateTaskDto } from '../../application/dto/tasks/create-task.dto'

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(createTaskDto: CreateTaskDto): Promise<Tasks> {
    // Validate required fields explicitly
    const requiredFields = [
      { field: 'vehicle_registration', value: createTaskDto.vehicle_registration },
      { field: 'customer_firstname', value: createTaskDto.customer_firstname },
      { field: 'customer_lastname', value: createTaskDto.customer_lastname },
      { field: 'customer_contact', value: createTaskDto.customer_contact },
      { field: 'date_booked', value: createTaskDto.date_booked },
      { field: 'time_booked', value: createTaskDto.time_booked },
      { field: 'branch_booked', value: createTaskDto.branch_booked },
      { field: 'created_by', value: createTaskDto.created_by },
    ]

    const missingFields = requiredFields.filter(({ value }) => !value).map(({ field }) => field)

    if (missingFields.length > 0) {
      throw new BadRequestException({
        success: false,
        message: 'Required fields are missing',
        errors: missingFields.map(field => ({
          field,
          message: `${field} is required and cannot be empty`,
          constraint: 'required',
        })),
      })
    }

    // Validate phone number format (optional but good practice)
    if (createTaskDto.customer_contact) {
      const phoneRegex = /^[0-9]{9,10}$/
      if (!phoneRegex.test(createTaskDto.customer_contact)) {
        throw new BadRequestException({
          success: false,
          message: 'Invalid phone number format',
          errors: [{
            field: 'customer_contact',
            message: 'Phone number must be 9-10 digits',
            constraint: 'format',
          }],
        })
      }
    }

    // Check for duplicate appointment_running if provided
    if (createTaskDto.appointment_running) {
      const existingTask = await this.taskRepository.findByAppointmentRunning(createTaskDto.appointment_running)
      if (existingTask) {
        throw new BadRequestException({
          success: false,
          message: 'Duplicate appointment running number',
          errors: [{
            field: 'appointment_running',
            message: `Appointment running number '${createTaskDto.appointment_running}' already exists`,
            constraint: 'unique',
            value: createTaskDto.appointment_running,
          }],
        })
      }
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(createTaskDto.date_booked)) {
      throw new BadRequestException({
        success: false,
        message: 'Invalid date format',
        errors: [{
          field: 'date_booked',
          message: 'Date must be in format YYYY-MM-DD',
          constraint: 'format',
        }],
      })
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
    if (!timeRegex.test(createTaskDto.time_booked)) {
      throw new BadRequestException({
        success: false,
        message: 'Invalid time format',
        errors: [{
          field: 'time_booked',
          message: 'Time must be in format HH:MM (24-hour)',
          constraint: 'format',
        }],
      })
    }

    return this.taskRepository.createTask(createTaskDto)
  }
}
