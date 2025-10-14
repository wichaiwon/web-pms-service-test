import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class CreateTaskDetailStepThreeDto {
  @IsNotEmpty()
  @IsUUID()
  task_id: string

  @IsOptional()
  first_battery_voltage?: number

  @IsOptional()
  second_battery_voltage?: number

  @IsOptional()
  first_measurement?: number

  @IsOptional()
  second_measurement?: number

  @IsOptional()
  first_rating?: number

  @IsOptional()
  second_rating?: number

  @IsOptional()
  success_flag?: boolean

  @IsNotEmpty()
  @IsUUID()
  created_by: string
}
