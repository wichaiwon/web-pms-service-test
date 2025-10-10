import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class UpdateTaskDetailStepTwoAdditionalServiceDto {
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

  @IsNotEmpty()
  @IsUUID()
  updated_by: string
}
