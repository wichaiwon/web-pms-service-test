import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { DamageCar } from 'src/shared/enum/task-detail-step-one'

export class CreateTaskDetailStepOneDto {
  @IsNotEmpty()
  @IsUUID()
  task_id: string

  @IsNotEmpty()
  @IsEnum(DamageCar)
  damage_car: DamageCar

  @IsNotEmpty()
  @IsString()
  damage_car_image: string

  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @IsNotEmpty()
  @IsUUID()
  created_by: string

}
