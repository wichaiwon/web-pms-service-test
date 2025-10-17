import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SyncAppointmentsUseCase } from '../use-cases/appointment.use-case';

@Injectable()
export class AppointmentSyncScheduler {
  private readonly logger = new Logger(AppointmentSyncScheduler.name);

  constructor(private readonly syncAppointmentsUseCase: SyncAppointmentsUseCase) {}

  @Cron('*/2 * * * *') // ทุก 2 นาที
  async syncAppointments() {
    this.logger.log('Starting appointment sync job...');
    
    try {
      await this.syncAppointmentsUseCase.execute();
      this.logger.log('Appointment sync completed successfully');
    } catch (error) {
      this.logger.error('Appointment sync failed:', error);
    }
  }
}