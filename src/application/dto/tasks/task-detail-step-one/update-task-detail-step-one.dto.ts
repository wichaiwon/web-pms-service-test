import { IsBoolean, IsEnum, IsOptional } from 'class-validator'
import { DamageCar } from 'src/shared/enum/task-detail-step-one'

export class UpdateTaskDetailStepOneDto {
  @IsOptional()
  @IsEnum(DamageCar)
  damage_car: DamageCar

  @IsOptional()
  damage_car_image?: string

  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @IsOptional()
  updated_by?: string
}
