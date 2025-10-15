import { IsNotEmpty, IsUUID, IsOptional, IsEnum, IsNumber, IsBoolean, IsString } from 'class-validator'
import { FuelLevel } from 'src/shared/enum/task-detail'

export class CreateTaskDetailDto {
  @IsNotEmpty()
  @IsUUID()
  task_id: string

  @IsNotEmpty()
  @IsString()
  task_detail_image1: string

  @IsNotEmpty()
  @IsString()
  task_detail_image2: string

  @IsOptional()
  @IsNumber()
  car_mileage?: number

  @IsNotEmpty()
  @IsEnum(FuelLevel)
  fuel_level: FuelLevel

  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @IsNotEmpty()
  created_by: string
}