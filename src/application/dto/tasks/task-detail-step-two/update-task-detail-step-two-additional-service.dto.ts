import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateTaskDetailStepTwoAdditionalServiceDto {
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
  @IsString()
  comment?: string

  @IsNotEmpty()
  @IsUUID()
  updated_by: string
}
