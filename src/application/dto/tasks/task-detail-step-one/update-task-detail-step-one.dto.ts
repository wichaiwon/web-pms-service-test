import { IsBoolean, IsEnum, IsOptional } from 'class-validator'
import { damageCar } from 'src/shared/enum/task-detail-step-one'

export class UpdateTaskDetailStepOneDto {
  @IsOptional()
  @IsEnum(damageCar)
  damage: damageCar

  @IsOptional()
  damage_car_image?: string

  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @IsOptional()
  updated_by?: string
}
