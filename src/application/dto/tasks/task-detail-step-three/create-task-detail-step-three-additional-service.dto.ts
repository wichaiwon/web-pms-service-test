import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateTaskDetailStepThreeAdditionalServiceDto {
  @IsNotEmpty()
  @IsUUID()
  task_detail_step_three_id: string

  @IsOptional()
  @IsString({ each: true })
  first_battery_voltage_image?: string[]

  @IsOptional()
  @IsString({ each: true })
  second_battery_voltage_image?: string[]

  @IsOptional()
  @IsString()
  comment?: string
}
