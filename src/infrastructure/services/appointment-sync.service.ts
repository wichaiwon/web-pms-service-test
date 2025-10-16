import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExternalApiService, AppointmentData } from './external-api.service';
import { Tasks } from '../../domain/entities/task/task.entity';
import { Users } from '../../domain/entities/user/user.entity';
import { CarType, CarBrand, StatusRepairOrder, StatusReport } from '../../shared/enum/task';
import { UserRole, Branch } from '../../shared/enum/user';

@Injectable()
export class AppointmentSyncService implements OnModuleInit {
  private readonly logger = new Logger(AppointmentSyncService.name);
  private systemUserId: string = 'system-sync';
  private systemCustomerId: string = 'system-customer';

  constructor(
    private readonly externalApiService: ExternalApiService,
    @InjectRepository(Tasks)
    private readonly taskRepository: Repository<Tasks>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async onModuleInit() {
    await this.ensureSystemUser();
  }

  /**
   * Ensure system user exists for sync operations
   */
  private async ensureSystemUser() {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { mirai_id: 'system-sync' },
      });

      if (!existingUser) {
        const systemUser = this.userRepository.create({
          pkg_id_member: 'SYS001',
          name: 'System',
          surname: 'Sync Service',
          role: UserRole.ADMIN,
          mirai_id: 'system-sync',
          password: 'system-password-hash',
          branch: Branch.HEAD_OFFICE,
          is_active: true,
          created_by: 'system',
        });

        const savedUser = await this.userRepository.save(systemUser);
        this.systemUserId = savedUser.id;
        // For customer_id, we'll use the same system user ID
        this.systemCustomerId = savedUser.id;
        
        this.logger.log('System user created for sync operations');
      } else {
        this.systemUserId = existingUser.id;
        this.systemCustomerId = existingUser.id;
      }
    } catch (error) {
      this.logger.error('Failed to create/find system user', error.stack);
    }
  }

  /**
   * Cron job ที่ทำงานทุก 10 นาที
   * Format: วินาที นาที ชั่วโมง วัน เดือน วันในสัปดาห์
   * 0 star/10 * * * * = ทุก 10 นาที
   */
  @Cron('0 */10 * * * *', {
    name: 'sync-appointments',
    timeZone: 'Asia/Bangkok',
  })
  async syncAppointments() {
    this.logger.log('Starting appointment synchronization');
    
    try {
      // Fetch appointments from external API
      const appointments = await this.externalApiService.fetchAppointments();
      
      if (!appointments || appointments.length === 0) {
        this.logger.log('No appointments found from external API');
        return;
      }

      let createdCount = 0;
      let updatedCount = 0;
      let skippedCount = 0;

      for (const appointment of appointments) {
        try {
          const result = await this.processAppointment(appointment);
          
          if (result === 'created') {
            createdCount++;
          } else if (result === 'updated') {
            updatedCount++;
          } else {
            skippedCount++;
          }
        } catch (error) {
          this.logger.error(
            `Failed to process appointment ${appointment.running}`,
            error.stack
          );
          skippedCount++;
        }
      }

      this.logger.log(
        `Appointment sync completed: ${createdCount} created, ${updatedCount} updated, ${skippedCount} skipped`
      );
    } catch (error) {
      this.logger.error('Failed to sync appointments', error.stack);
    }
  }

  /**
   * Process individual appointment
   * @param appointment - Appointment data from external API
   * @returns 'created' | 'updated' | 'skipped'
   */
  private async processAppointment(appointment: AppointmentData): Promise<'created' | 'updated' | 'skipped'> {
    // Check if appointment already exists (using external running number as unique identifier)
    const existingTask = await this.taskRepository.findOne({
      where: {
        chassis_number: appointment.running?.toString(),
      },
    });

    // Transform appointment data
    const taskData = this.mapAppointmentToTask(appointment);

    if (existingTask) {
      // Update existing task if there are changes
      const hasChanges = this.hasSignificantChanges(existingTask, taskData);
      
      if (hasChanges) {
        await this.taskRepository.update(existingTask.id, {
          ...taskData,
          updated_at: new Date(),
          updated_by: this.systemUserId,
        });
        
        this.logger.debug(`Updated task for appointment ${appointment.running}`);
        return 'updated';
      } else {
        return 'skipped';
      }
    } else {
      // Create new task
      const newTask = this.taskRepository.create({
        ...taskData,
        created_by: this.systemUserId,
        created_at: new Date(),
        is_active: true,
      });

      await this.taskRepository.save(newTask);
      
      this.logger.debug(`Created new task for appointment ${appointment.running}`);
      return 'created';
    }
  }

  /**
   * Map appointment data to task entity structure
   * @param appointment - Appointment data from external API
   * @returns Task entity data
   */
  private mapAppointmentToTask(appointment: AppointmentData) {
    return {
      // Use running number as chassis_number for uniqueness
      chassis_number: appointment.running?.toString() || Date.now().toString(),
      
      // Map vehicle information
      vehicle_registration: appointment.service_date_license || undefined,
      engine_number: appointment.machine || `ENG-${appointment.running}`,
      
      // Customer information - using system customer ID
      customer_id: this.systemCustomerId,
      
      // Service information
      walk_in_flag: appointment.channel === 'รับหน้าร้าน',
      
      // Map car type and brand based on available data
      car_type: this.determineCarType(appointment.group_car),
      car_brand: this.determineCarBrand(appointment.machine, appointment.group_car),
      
      // Status mapping
      status_repair_order: this.mapRepairOrderStatus(appointment.status_appointments),
      status_report: StatusReport.NOT_ISSUED, // Default status
      
      // Success flag based on status
      success_flag: appointment.status_appointments === 'ยืนยันแล้ว',
      
      // Additional fields (stored as JSON in notes or separate fields if needed)
      // These would need additional columns in the task table or JSON storage
    };
  }

  /**
   * Determine car type from group_car field
   */
  private determineCarType(groupCar: string): CarType {
    if (!groupCar) return CarType.LCV; // Default
    
    const lowerGroupCar = groupCar.toLowerCase();
    
    if (lowerGroupCar.includes('รถเล็ก') || lowerGroupCar.includes('lcv')) {
      return CarType.LCV;
    } else if (lowerGroupCar.includes('รถใหญ่') || lowerGroupCar.includes('cv')) {
      return CarType.CV;
    }
    
    return CarType.LCV; // Default
  }

  /**
   * Determine car brand from machine and group_car
   */
  private determineCarBrand(machine: string, groupCar: string): CarBrand {
    // For now, default to ISUZU since it seems to be the main brand
    // You can add more logic here based on machine codes or other identifiers
    return CarBrand.ISUZU;
  }

  /**
   * Map appointment status to repair order status
   */
  private mapRepairOrderStatus(status: string): StatusRepairOrder {
    if (!status) return StatusRepairOrder.NOT_OPENED;
    
    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus.includes('ยืนยัน')) {
      return StatusRepairOrder.CONFIRMED;
    } else if (lowerStatus.includes('จอง')) {
      return StatusRepairOrder.NOT_OPENED;
    }
    
    return StatusRepairOrder.NOT_OPENED; // Default
  }

  /**
   * Check if there are significant changes between existing task and new data
   */
  private hasSignificantChanges(existingTask: Tasks, newTaskData: any): boolean {
    // Compare key fields that might change
    return (
      existingTask.vehicle_registration !== newTaskData.vehicle_registration ||
      existingTask.engine_number !== newTaskData.engine_number ||
      existingTask.status_repair_order !== newTaskData.status_repair_order ||
      existingTask.success_flag !== newTaskData.success_flag
    );
  }

  /**
   * Manual trigger method for testing
   */
  async triggerSync() {
    this.logger.log('Manual sync triggered');
    await this.syncAppointments();
  }
}