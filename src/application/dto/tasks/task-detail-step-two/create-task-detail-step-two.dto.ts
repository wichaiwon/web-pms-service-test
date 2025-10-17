import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import {
  Cargo,
  SpareTire,
  TireCondition,
  TireDamage,
  TireDepth,
  TruckToolSet,
  WheelControlCover,
} from 'src/shared/enum/task-detail-step-two'

export class CreateTaskDetailStepTwoDto {
  @IsNotEmpty()
  @IsUUID()
  task_id: string

  @IsOptional()
  @IsEnum(SpareTire)
  spare_tire?: SpareTire

  @IsOptional()
  @IsEnum(WheelControlCover)
  wheel_control_cover?: WheelControlCover

  @IsOptional()
  @IsEnum(Cargo)
  cargo?: Cargo

  @IsOptional()
  @IsEnum(TruckToolSet)
  truck_tool_set?: TruckToolSet

  @IsOptional()
  @IsString()
  left_front_tire_year?: string

  @IsOptional()
  @IsString()
  right_front_tire_year?: string

  @IsOptional()
  @IsString()
  left_back_tire_year?: string

  @IsOptional()
  @IsString()
  right_back_tire_year?: string

  @IsOptional()
  @IsNumber()
  left_front_tire_pressure?: number

  @IsOptional()
  @IsNumber()
  right_front_tire_pressure?: number

  @IsOptional()
  @IsNumber()
  left_back_tire_pressure?: number

  @IsOptional()
  @IsNumber()
  right_back_tire_pressure?: number

  @IsOptional()
  @IsEnum(TireDepth)
  left_front_tire_depth?: TireDepth

  @IsOptional()
  @IsEnum(TireDepth)
  right_front_tire_depth?: TireDepth

  @IsOptional()
  @IsEnum(TireDepth)
  left_back_tire_depth?: TireDepth

  @IsOptional()
  @IsEnum(TireDepth)
  right_back_tire_depth?: TireDepth

  @IsOptional()
  @IsEnum(TireCondition)
  left_front_tire_condition?: TireCondition

  @IsOptional()
  @IsEnum(TireCondition)
  right_front_tire_condition?: TireCondition

  @IsOptional()
  @IsEnum(TireCondition)
  left_back_tire_condition?: TireCondition

  @IsOptional()
  @IsEnum(TireCondition)
  right_back_tire_condition?: TireCondition

  @IsOptional()
  @IsEnum(TireDamage)
  left_front_tire_damage?: TireDamage

  @IsOptional()
  @IsEnum(TireDamage)
  right_front_tire_damage?: TireDamage

  @IsOptional()
  @IsEnum(TireDamage)
  left_back_tire_damage?: TireDamage

  @IsOptional()
  @IsEnum(TireDamage)
  right_back_tire_damage?: TireDamage

  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @IsNotEmpty()
  @IsUUID()
  created_by: string
}
