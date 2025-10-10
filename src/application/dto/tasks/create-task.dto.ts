import { IsNotEmpty, IsUUID, IsOptional, IsBoolean, IsEnum, IsArray} from 'class-validator'
import { CarBrand, CarType, StatusRepairOrder, StatusReport } from 'src/shared/enum/task'

export class CreateTaskDto {
  @IsOptional()
  @IsBoolean()
  walk_in_flag?: boolean

  @IsOptional()
  vehicle_registration?: string

  @IsNotEmpty()
  engine_number: string

  @IsNotEmpty()
  chassis_number: string

  @IsNotEmpty()
  customer_id: string

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
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
