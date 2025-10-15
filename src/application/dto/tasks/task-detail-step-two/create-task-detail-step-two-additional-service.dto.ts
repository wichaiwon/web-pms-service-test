import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateTaskDetailStepTwoAdditionalServiceDto {
  @IsNotEmpty()
  @IsUUID()
  task_detail_step_two_id: string

  @IsOptional()
  @IsString({ each: true })
  left_front_tire_image?: string[]

  @IsOptional()
  @IsString({ each: true })
  right_front_tire_image?: string[]

  @IsOptional()
  @IsString({ each: true })
  left_back_tire_image?: string[]

  @IsOptional()
  @IsString({ each: true })
  right_back_tire_image?: string[]

  @IsOptional()
  comment?: string
}
