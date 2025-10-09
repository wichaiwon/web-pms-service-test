import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'
import { damageCar } from 'src/shared/enum/task-detail-step-one'

export class TaskDetailStepOneDto {
  @IsNotEmpty()
  @IsUUID()
  task_id: string

  @IsNotEmpty()
  @IsEnum(damageCar)
  damage: damageCar

  @IsNotEmpty()
  damage_car_image: string

  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @IsUUID()
  created_by: string

  @IsUUID()
  updated_by: string
}
