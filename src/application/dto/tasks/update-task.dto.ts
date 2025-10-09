import { IsNotEmpty, IsUUID, IsOptional, IsBoolean, IsEnum, IsArray, isEnum, isNotEmpty } from 'class-validator'
import { CarBrand, CarType, StatusRepairOrder, StatusReport } from 'src/shared/enum/task'

export class UpdateTaskDto {

  @IsOptional()
  @IsBoolean()
  success_flag?: boolean
  
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  responsible?: string[]

  @IsNotEmpty()
  @IsEnum(StatusRepairOrder)
  status_repair_order: StatusRepairOrder

  @IsNotEmpty()
  @IsEnum(StatusReport)
  status_report: StatusReport

  @IsOptional()
  @IsBoolean()
  is_active?: boolean

  @IsNotEmpty()
  updated_by: string

  @IsNotEmpty()
  updated_at: Date
}
