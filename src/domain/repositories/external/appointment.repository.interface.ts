import { AppointmentResponseDto } from 'src/shared/types/appointment'

export interface IAppointmentRepository {
  fetchAppointment(): Promise<AppointmentResponseDto[]>
}
