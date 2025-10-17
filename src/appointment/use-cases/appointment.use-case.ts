import { Injectable, Inject } from '@nestjs/common';
import type { IAppointmentRepository } from '../../domain/repositories/external/appointment.repository.interface';
import type{ IUserRepository } from '../../domain/repositories/user/user.repository.interface';
import type { ITaskRepository } from '../../domain/repositories/task/task.repository.interface';
import  { AppointmentEntity } from '../../domain/entities/appointment/appointment.entity';
import { CreateTaskDto } from '../../application/dto/tasks/create-task.dto';
import { UpdateTaskDto } from '../../application/dto/tasks/update-task.dto';

@Injectable()
export class SyncAppointmentsUseCase {
  private readonly DEFAULT_USER_ID = '5c415b54-8efc-49f9-a191-b59e629086b8';

  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(): Promise<void> {
    try {
      // 1. Fetch appointments from N8N
      const appointmentsData = await this.appointmentRepository.fetchAppointment();
      
      // 2. Process each appointment
      for (const appointmentData of appointmentsData) {
        const appointment = new AppointmentEntity(appointmentData);
        
        // 3. Find user by responsible name
        const userId = await this.findUserByResponsible(appointment.responsible);
        
        // 4. Map to task data
        const taskData = appointment.toTaskData(userId);
        
        // 5. Check if task exists and update or create
        await this.createOrUpdateTask(taskData);
      }
    } catch (error) {
      console.error('Error syncing appointments:', error);
      throw error;
    }
  }

  private async findUserByResponsible(responsibleName: string): Promise<string> {
    try {
      const names = responsibleName.trim().split(' ');
      const firstname = names[0] || '';
      const lastname = names.slice(1).join(' ') || '';
      
      const user = await this.userRepository.findByFirstnameAndLastname(firstname, lastname);
      return user ? user.id : this.DEFAULT_USER_ID;
    } catch (error) {
      console.error('Error finding user:', error);
      return this.DEFAULT_USER_ID;
    }
  }

  private async createOrUpdateTask(taskData: CreateTaskDto): Promise<void> {
    try {
      const existingTask = await this.taskRepository.findByAppointmentRunning(taskData.appointment_running);
      
      if (existingTask) {
        // Update existing task - merge responsible array
        const currentResponsible = existingTask.responsible || [];
        const newResponsible = taskData.responsible || [];
        const updatedResponsible = [...new Set([...currentResponsible, ...newResponsible])];
        
        const updateDto: UpdateTaskDto = {
          vehicle_registration: taskData.vehicle_registration,
          vehicle_registration_province: taskData.vehicle_registration_province,
          vin_number: taskData.vin_number,
          engine_number: taskData.engine_number,
          chassis_number: taskData.chassis_number,
          responsible: updatedResponsible,
          lift: taskData.lift,
          status_repair_order: taskData.status_repair_order,
          status_report: taskData.status_report,
          updated_by: taskData.created_by,
        };
        
        await this.taskRepository.updateTask(existingTask.id, updateDto);
      } else {
        // Create new task
        await this.taskRepository.createTask(taskData);
      }
    } catch (error) {
      console.error('Error creating/updating task:', error);
      throw error;
    }
  }
}