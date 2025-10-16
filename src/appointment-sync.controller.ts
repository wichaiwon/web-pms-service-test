import { Controller, Post, Get, Logger } from '@nestjs/common';
import { AppointmentSyncService } from './infrastructure/services/appointment-sync.service';
import { ExternalApiService } from './infrastructure/services/external-api.service';

@Controller('appointment-sync')
export class AppointmentSyncController {
  private readonly logger = new Logger(AppointmentSyncController.name);

  constructor(
    private readonly appointmentSyncService: AppointmentSyncService,
    private readonly externalApiService: ExternalApiService,
  ) {}

  /**
   * Manual trigger for appointment synchronization (for testing)
   */
  @Post('trigger')
  async triggerSync() {
    this.logger.log('Manual sync trigger requested');
    
    try {
      await this.appointmentSyncService.triggerSync();
      return {
        success: true,
        message: 'Appointment synchronization completed successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Manual sync failed', error.stack);
      return {
        success: false,
        message: 'Appointment synchronization failed',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Test endpoint to check external API connection
   */
  @Get('test-api')
  async testExternalApi() {
    this.logger.log('Testing external API connection');
    
    try {
      const appointments = await this.externalApiService.fetchAppointments();
      return {
        success: true,
        message: 'External API connection successful',
        appointmentCount: appointments.length,
        sampleAppointment: appointments.length > 0 ? appointments[0] : null,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('External API test failed', error.stack);
      return {
        success: false,
        message: 'External API connection failed',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Get sync status and information
   */
  @Get('status')
  async getSyncStatus() {
    return {
      success: true,
      message: 'Appointment sync service is running',
      cronSchedule: '0 */10 * * * * (Every 10 minutes)',
      timezone: 'Asia/Bangkok',
      externalApiUrl: 'https://n8n-pmsg.agilesoftgroup.com/webhook/pms-service/appointment',
      timestamp: new Date().toISOString(),
    };
  }
}