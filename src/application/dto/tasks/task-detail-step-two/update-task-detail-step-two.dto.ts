import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator'
import { 
  Cargo, 
  SpareTire, 
  TireCondition, 
  TireDamage, 
  TireDepth, 
  TruckToolSet, 
  WheelControlCover 
} from 'src/shared/enum/task-detail-step-two'

export class UpdateTaskDetailStepTwoDto {
  @IsOptional()
  spare_tire?: SpareTire

  @IsOptional()
  wheel_control_cover?: WheelControlCover

  @IsOptional()
  cargo?: Cargo

  @IsOptional()
  truck_tool_set?: TruckToolSet

  @IsOptional()
  left_front_tire_year?: string

  @IsOptional()
  right_front_tire_year?: string

  @IsOptional()
  left_back_tire_year?: string

  @IsOptional()
  right_back_tire_year?: string

  @IsOptional()
  left_front_tire_pressure?: number

  @IsOptional()
  right_front_tire_pressure?: number

  @IsOptional()
  left_back_tire_pressure?: number

  @IsOptional()
  right_back_tire_pressure?: number

  @IsOptional()
  left_front_tire_depth?: TireDepth

  @IsOptional()
  right_front_tire_depth?: TireDepth

  @IsOptional()
  left_back_tire_depth?: TireDepth

  @IsOptional()
  right_back_tire_depth?: TireDepth

  @IsOptional()
  left_front_tire_condition?: TireCondition

  @IsOptional()
  right_front_tire_condition?: TireCondition

  @IsOptional()
  left_back_tire_condition?: TireCondition

  @IsOptional()
  right_back_tire_condition?: TireCondition

  @IsOptional()
  left_front_tire_damage?: TireDamage

  @IsOptional()
  right_front_tire_damage?: TireDamage

  @IsOptional()
  left_back_tire_damage?: TireDamage

  @IsOptional()
  right_back_tire_damage?: TireDamage

  @IsOptional()
  success_flag?: boolean

  @IsNotEmpty()
  @IsUUID()
  updated_by: string
}
