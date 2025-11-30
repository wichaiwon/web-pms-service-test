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
      
      // Handle case when no appointments are returned (e.g., on Sundays)
      if (!appointmentsData || !Array.isArray(appointmentsData) || appointmentsData.length === 0) {
        console.log('No appointments found to sync');
        // Still check for cancelled appointments
        await this.deactivateCancelledAppointments(new Set());
        return;
      }
      
      // 2. Create a Set of active appointment_running IDs from N8N
      const activeAppointmentRunnings = new Set(
        appointmentsData.map((apt) => apt.appointment_running)
      );
      
      // 3. Process each appointment (create or update)
      for (const appointmentData of appointmentsData) {
        const appointment = new AppointmentEntity(appointmentData);
        
        // Find user by responsible name
        const userId = await this.findUserByResponsible(appointment.responsible);
        
        // Map to task data
        const taskData = appointment.toTaskData(userId);
        
        // Check if task exists and update or create
        await this.createOrUpdateTask(taskData);
      }
      
      // 4. Check for cancelled appointments (tasks that have appointment_running but not in N8N anymore)
      await this.deactivateCancelledAppointments(activeAppointmentRunnings);
      
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
        // Check if data has actually changed
        const currentResponsible = existingTask.responsible || [];
        const newResponsible = taskData.responsible || [];
        const updatedResponsible = [...new Set([...currentResponsible, ...newResponsible])];
        
        // Compare data to see if update is needed
        const hasChanges = 
          existingTask.vehicle_registration !== taskData.vehicle_registration ||
          existingTask.vehicle_registration_province !== taskData.vehicle_registration_province ||
          existingTask.lift !== taskData.lift ||
          JSON.stringify(currentResponsible.sort()) !== JSON.stringify(updatedResponsible.sort());
        
        if (hasChanges) {
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
          console.log(`Task ${taskData.appointment_running} updated - changes detected`);
        } else {
          console.log(`Task ${taskData.appointment_running} skipped - no changes`);
        }
      } else {
        // Create new task
        await this.taskRepository.createTask(taskData);
        console.log(`Task ${taskData.appointment_running} created`);
      }
    } catch (error) {
      console.error('Error creating/updating task:', error);
      throw error;
    }
  }

  private async deactivateCancelledAppointments(activeAppointmentRunnings: Set<string>): Promise<void> {
    try {
      // Get all active tasks that have appointment_running
      const activeTasks = await this.taskRepository.getAllActiveTasksWithAppointment();
      
      // Find tasks that are no longer in N8N (cancelled appointments)
      const cancelledTasks = activeTasks.filter(
        (task) => !activeAppointmentRunnings.has(task.appointment_running)
      );
      
      // Deactivate each cancelled task
      for (const task of cancelledTasks) {
        const updateDto: UpdateTaskDto = {
          is_active: false,
          updated_by: task.created_by,
        };
        
        await this.taskRepository.updateTask(task.id, updateDto);
        console.log(`Task ${task.appointment_running} deactivated - appointment cancelled in N8N`);
      }
      
      if (cancelledTasks.length > 0) {
        console.log(`Deactivated ${cancelledTasks.length} cancelled appointment(s)`);
      }
    } catch (error) {
      console.error('Error deactivating cancelled appointments:', error);
      throw error;
    }
  }
}