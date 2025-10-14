import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class CreateTaskDetailStepThreeAdditionalServiceDto {
  @IsNotEmpty()
  task_detail_step_three_id: string

  @IsOptional()
  first_battery_voltage_image?: string[]

  @IsOptional()
  second_battery_voltage_image?: string[]

  @IsOptional()
  comment?: string

}
