import { IsNotEmpty, IsUUID, IsOptional, IsBoolean, IsEnum, IsArray, IsString } from 'class-validator'
import { CarBrand, CarType, StatusRepairOrder, StatusReport } from 'src/shared/enum/task'
import { Branch } from 'src/shared/enum/user'

export class CreateTaskDto {
  @IsOptional()
  @IsBoolean()
  walk_in_flag?: boolean

  @IsNotEmpty()
  @IsString()
  appointment_running: string

  @IsNotEmpty()
  @IsString()
  vehicle_registration?: string

  @IsOptional()
  @IsString()
  vehicle_registration_province?: string

  @IsNotEmpty()
  @IsString()
  customer_firstname: string

  @IsNotEmpty()
  @IsString()
  customer_lastname: string

  @IsNotEmpty()
  @IsString()
  customer_contact: string

  @IsNotEmpty()
  @IsString()
  date_booked: string

  @IsNotEmpty()
  @IsString()
  time_booked: string

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  responsible?: string[]

  @IsOptional()
  @IsString()
  vin_number?: string

  @IsOptional()
  @IsString()
  engine_number?: string

  @IsOptional()
  @IsString()
  chassis_number?: string

  @IsNotEmpty()
  @IsEnum(Branch)
  branch_book: Branch

  @IsOptional()
  @IsString()
  lift?: string

  @IsNotEmpty()
  @IsEnum(CarType)
  car_type: CarType

  @IsNotEmpty()
  @IsEnum(CarBrand)
  car_brand: CarBrand

  @IsOptional()
  @IsEnum(StatusRepairOrder)
  status_repair_order?: StatusRepairOrder

  @IsOptional()
  @IsEnum(StatusReport)
  status_report?: StatusReport

  @IsNotEmpty()
  @IsUUID()
  created_by: string
}
