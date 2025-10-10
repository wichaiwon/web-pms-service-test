import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class CreateTaskDetailStepTwoAdditionalServiceDto {
  @IsNotEmpty()
  @IsUUID()
  task_detail_step_two_id: string

  @IsOptional()
  left_front_tire_image?: string[]

  @IsOptional()
  right_front_tire_image?: string[]

  @IsOptional()
  left_back_tire_image?: string[]

  @IsOptional()
  right_back_tire_image?: string[]

  @IsOptional()
  comment?: string
}
