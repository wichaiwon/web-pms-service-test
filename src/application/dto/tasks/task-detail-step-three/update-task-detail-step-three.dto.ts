import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class UpdateTaskDetailStepThreeDto {
  @IsOptional()
  first_battery_voltage?: number

  @IsOptional()
  second_battery_voltage?: number

  @IsOptional()
  first_measurment?: number

  @IsOptional()
  second_measurment?: number

  @IsOptional()
  first_rating?: number

  @IsOptional()
  second_rating?: number

  @IsOptional()
  success_flag?: boolean

  @IsNotEmpty()
  @IsUUID()
  updated_by: string
}
