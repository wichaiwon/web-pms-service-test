import { IsNotEmpty, IsUUID, IsOptional, IsBoolean, IsEnum, IsArray, IsString } from 'class-validator'
import { StatusRepairOrder, StatusReport } from 'src/shared/enum/task'

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  vehicle_registration?: string

  @IsOptional()
  @IsString()
  vehicle_registration_province?: string

  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @IsOptional()
  @IsString()
  vin_number?: string

  @IsOptional()
  @IsString()
  engine_number?: string

  @IsOptional()
  @IsString()
  chassis_number?: string

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  responsible?: string[]

  @IsOptional()
  @IsString()
  lift?: string

  @IsOptional()
  @IsEnum(StatusRepairOrder)
  status_repair_order?: StatusRepairOrder

  @IsOptional()
  @IsEnum(StatusReport)
  status_report?: StatusReport

  @IsOptional()
  @IsBoolean()
  is_active?: boolean

  @IsNotEmpty()
  @IsUUID()
  updated_by: string
}
