import { Branch } from 'aws-sdk/clients/sagemaker'
import { CarBrand, CarType, StatusRepairOrder } from '../enum/task'
import { AdditionalService, FuelLevel, TirePressure } from '../enum/task-detail'

export type TaskView = {
  id: string
  walk_in_flag: boolean
  in_process_flag: boolean
  vehicle_registration: string
  vehicle_registration_province: string
  customer_firstname: string
  customer_lastname: string
  customer_contact: string
  date_booked: string
  time_booked: string
  vin_number: string
  engine_number: string
  chassis_number: string
  branch_booked: Branch
  task_success_flag: boolean
  car_type: CarType
  car_brand: CarBrand
  task_is_active: boolean
  task_detail_image1: string
  task_detail_image2: string
  car_mileage: number
  fuel_level: FuelLevel
  task_detail_success_flag: boolean
  task_detail_is_active: boolean
  tire_pressure: TirePressure
  additional_service: AdditionalService[]
  front_tire_pressure: number
  back_tire_pressure: number
  comment: string
}
