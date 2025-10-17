import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateTaskDetailStepThreeAdditionalServiceDto {
  @IsOptional()
  @IsString({ each: true })
  first_battery_image?: string[]

  @IsOptional()
  @IsString({ each: true })
  second_battery_image?: string[]

  @IsOptional()
  @IsString()
  comment?: string

  @IsNotEmpty()
  @IsUUID()
  updated_by: string
}
