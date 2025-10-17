import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { IAppointmentRepository } from 'src/domain/repositories/external/appointment.repository.interface'
import { AppointmentResponseDto } from 'src/shared/types/appointment'

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  private readonly n8nApiUrl = 'https://n8n-pmsg.agilesoftgroup.com/webhook/pms-service/appointment'
  constructor(private readonly httpService: HttpService) {}

  async fetchAppointment(): Promise<AppointmentResponseDto[]> {
    try {
      const response = await firstValueFrom(this.httpService.post<AppointmentResponseDto[]>(this.n8nApiUrl))
      return response.data
    } catch (error) {
      console.error('Error fetching appointments from N8n:', error)
      throw new Error('Failed to fetch appointments from N8n')
    }
  }
}
