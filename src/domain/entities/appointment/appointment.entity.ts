import { AppointmentResponseDto } from 'src/shared/types/appointment'
import { CreateTaskDto } from 'src/application/dto/tasks/create-task.dto'
import { Branch } from 'src/shared/enum/user'

export class AppointmentEntity implements AppointmentResponseDto {
  appointment_running: string
  vehicle_registration: string
  vehicle_registration_province: string
  customer_firstname: string
  customer_lastname: string
  customer_contact: string
  engine_number: string
  vin_number: string
  chassis_number: string
  date_booked: string
  time_booked: string
  branch_booked: Branch
  lift: string
  responsible: string
  constructor(data: AppointmentResponseDto) {
    Object.assign(this, data)
  }
  getResponsibleNames(): { firstname: string; lastname: string } {
    const names = this.responsible.trim().split(' ')
    const firstname = names[0] || ''
    const lastname = names.slice(1).join(' ') || ''
    return { firstname, lastname }
  }
  toTaskData(userId: string): CreateTaskDto {
    if (!this.branch_booked) {
      throw new Error(`branch_booked is required for appointment ${this.appointment_running}`)
    }
    
    return {
      walk_in_flag: false,
      appointment_running: this.appointment_running,
      vehicle_registration: this.vehicle_registration,
      vehicle_registration_province: this.vehicle_registration_province,
      customer_firstname: this.customer_firstname,
      customer_lastname: this.customer_lastname,
      customer_contact: this.customer_contact,
      vin_number: this.vin_number,
      engine_number: this.engine_number,
      chassis_number: this.chassis_number,
      date_booked: this.date_booked,
      time_booked: this.time_booked,
      responsible: [userId],
      branch_booked: this.branch_booked,
      lift: this.lift,
      created_by: userId,
    }
  }

}
