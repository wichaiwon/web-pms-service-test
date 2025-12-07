import { Branch } from "../enum/user"

export interface AppointmentResponseDto {
  appointment_running: string
  vehicle_registration: string
  vehicle_registration_province: string
  customer_firstname: string
  customer_lastname: string
  customer_contact: string
  model_number?: string
  model_name?: string
  engine_number: string
  vin_number: string
  chassis_number: string
  date_booked: string
  time_booked: string
  branch_booked: Branch
  lift: string
  responsible: string
}

export interface MappedTaskDto {
  walk_in_flag?: boolean
  appointment_running: string
  vehicle_registration: string
  vehicle_registration_province?: string
  customer_firstname: string
  customer_lastname: string
  customer_contact: string
  model_number?: string
  model_name?: string
  date_booked: string
  time_booked: string
  responsible?: string[]
  vin_number?: string
  engine_number?: string
  chassis_number?: string
  branch_booked: Branch
  lift?: string
  car_type?: string
  car_brand?: string
  status_repair_order?: string
  status_report?: string
  created_by: string
}
