import { Controller, Post, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { SyncAppointmentsUseCase } from './use-cases/appointment.use-case'

@ApiTags('Appointments')
@ApiBearerAuth('Bearer')
@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentController {
  constructor(private readonly syncAppointmentsUseCase: SyncAppointmentsUseCase) {}

  @Post('sync')
  @ApiOperation({ 
    summary: 'Manual appointment sync', 
    description: 'Manually trigger appointment synchronization from N8N' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Sync completed successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        timestamp: { type: 'string' }
      }
    }
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Sync failed',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' }
      }
    }
  })
  async manualSync() {
    await this.syncAppointmentsUseCase.execute()
    return {
      success: true,
      message: 'Appointment sync completed successfully',
      data: {
        timestamp: new Date().toISOString()
      }
    }
  }
}