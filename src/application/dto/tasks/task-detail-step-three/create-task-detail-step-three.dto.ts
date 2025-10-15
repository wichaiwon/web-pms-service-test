import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator'

export class CreateTaskDetailStepThreeDto {
  @IsNotEmpty()
  @IsUUID()
  task_id: string

  @IsOptional()
  @IsNumber()
  first_battery_voltage?: number

  @IsOptional()
  @IsNumber()
  second_battery_voltage?: number

  @IsOptional()
  @IsNumber()
  first_measurement?: number

  @IsOptional()
  @IsNumber()
  second_measurement?: number

  @IsOptional()
  @IsNumber()
  first_rating?: number

  @IsOptional()
  @IsNumber()
  second_rating?: number

  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @IsNotEmpty()
  @IsUUID()
  created_by: string
}
