import { IsNotEmpty, IsUUID, IsOptional, IsBoolean, IsEnum, IsArray, IsString} from 'class-validator'
import { CarBrand, CarType, StatusRepairOrder, StatusReport } from 'src/shared/enum/task'

export class CreateTaskDto {
  @IsOptional()
  @IsBoolean()
  walk_in_flag?: boolean

  @IsOptional()
  @IsString()
  vehicle_registration?: string

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
  @IsString()
  customer_name: string

  @IsNotEmpty()
  @IsString()
  customer_surname: string

  @IsNotEmpty()
  @IsString()
  customer_contact: string

  @IsOptional()
  @IsArray()
  @IsUUID()
  responsible?: string[]

  @IsNotEmpty()
  @IsEnum(CarBrand)
  car_brand: CarBrand

  @IsNotEmpty()
  @IsEnum(CarType)
  car_type: CarType

  @IsNotEmpty()
  @IsEnum(StatusRepairOrder)
  status_repair_order: StatusRepairOrder

  @IsNotEmpty()
  @IsEnum(StatusReport)
  status_report: StatusReport

  @IsNotEmpty()
  created_by: string
}
