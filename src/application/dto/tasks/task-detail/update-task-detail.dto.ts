import { IsOptional, IsEnum, IsNumber, IsBoolean, IsString } from 'class-validator'
import { FuelLevel } from 'src/shared/enum/task-detail'

export class UpdateTaskDetailDto {
  @IsOptional()
  @IsString()
  task_detail_image1?: string

  @IsOptional()
  @IsString()
  task_detail_image2?: string

  @IsOptional()
  @IsNumber()
  car_mileage?: number

  @IsOptional()
  @IsEnum(FuelLevel)
  fuel_level?: FuelLevel

  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @IsOptional()
  updated_by?: string
}
