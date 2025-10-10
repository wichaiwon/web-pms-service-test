import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'
import { damageCar } from 'src/shared/enum/task-detail-step-one'

export class CreateTaskDetailStepOneDto {
  @IsNotEmpty()
  @IsUUID()
  task_id: string

  @IsNotEmpty()
  @IsEnum(damageCar)
  damage_car: damageCar

  @IsNotEmpty()
  damage_car_image: string

  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @IsNotEmpty()
  @IsUUID()
  created_by: string

  @IsOptional()
  @IsUUID()
  updated_by?: string
}
