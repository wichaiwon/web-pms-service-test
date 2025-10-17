import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  Cargo,
  SpareTire,
  TireCondition,
  TireDamage,
  TireDepth,
  TruckToolSet,
  WheelControlCover,
} from 'src/shared/enum/task-detail-step-two'

export class UpdateTaskDetailStepTwoDto {
  @ApiPropertyOptional({ 
    description: 'Spare tire availability',
    enum: SpareTire,
    example: SpareTire.HAVE 
  })
  @IsOptional()
  @IsEnum(SpareTire)
  spare_tire?: SpareTire

  @ApiPropertyOptional({ 
    description: 'Wheel control cover availability',
    enum: WheelControlCover,
    example: WheelControlCover.HAVE 
  })
  @IsOptional()
  @IsEnum(WheelControlCover)
  wheel_control_cover?: WheelControlCover

  @ApiPropertyOptional({ 
    description: 'Cargo availability (for trucks only)',
    enum: Cargo,
    example: Cargo.HAVE 
  })
  @IsOptional()
  @IsEnum(Cargo)
  cargo?: Cargo

  @ApiPropertyOptional({ 
    description: 'Truck tool set availability (for trucks only)',
    enum: TruckToolSet,
    example: TruckToolSet.HAVE 
  })
  @IsOptional()
  @IsEnum(TruckToolSet)
  truck_tool_set?: TruckToolSet

  @ApiPropertyOptional({ 
    description: 'Left front tire manufacturing year',
    example: '2023' 
  })
  @IsOptional()
  @IsString()
  left_front_tire_year?: string

  @ApiPropertyOptional({ 
    description: 'Right front tire manufacturing year',
    example: '2023' 
  })
  @IsOptional()
  @IsString()
  right_front_tire_year?: string

  @ApiPropertyOptional({ 
    description: 'Left back tire manufacturing year',
    example: '2023' 
  })
  @IsOptional()
  @IsString()
  left_back_tire_year?: string

  @ApiPropertyOptional({ 
    description: 'Right back tire manufacturing year',
    example: '2023' 
  })
  @IsOptional()
  @IsString()
  right_back_tire_year?: string

  @ApiPropertyOptional({ 
    description: 'Left front tire pressure (PSI)',
    example: 32 
  })
  @IsOptional()
  @IsNumber()
  left_front_tire_pressure?: number

  @ApiPropertyOptional({ 
    description: 'Right front tire pressure (PSI)',
    example: 32 
  })
  @IsOptional()
  @IsNumber()
  right_front_tire_pressure?: number

  @ApiPropertyOptional({ 
    description: 'Left back tire pressure (PSI)',
    example: 32 
  })
  @IsOptional()
  @IsNumber()
  left_back_tire_pressure?: number

  @ApiPropertyOptional({ 
    description: 'Right back tire pressure (PSI)',
    example: 32 
  })
  @IsOptional()
  @IsNumber()
  right_back_tire_pressure?: number

  @ApiPropertyOptional({ 
    description: 'Left front tire tread depth',
    enum: TireDepth,
    example: TireDepth.FIVE 
  })
  @IsOptional()
  @IsEnum(TireDepth)
  left_front_tire_depth?: TireDepth

  @ApiPropertyOptional({ 
    description: 'Right front tire tread depth',
    enum: TireDepth,
    example: TireDepth.FIVE 
  })
  @IsOptional()
  @IsEnum(TireDepth)
  right_front_tire_depth?: TireDepth

  @ApiPropertyOptional({ 
    description: 'Left back tire tread depth',
    enum: TireDepth,
    example: TireDepth.FIVE 
  })
  @IsOptional()
  @IsEnum(TireDepth)
  left_back_tire_depth?: TireDepth

  @ApiPropertyOptional({ 
    description: 'Right back tire tread depth',
    enum: TireDepth,
    example: TireDepth.FIVE 
  })
  @IsOptional()
  @IsEnum(TireDepth)
  right_back_tire_depth?: TireDepth

  @ApiPropertyOptional({ 
    description: 'Left front tire condition',
    enum: TireCondition,
    example: TireCondition.NORMAL 
  })
  @IsOptional()
  @IsEnum(TireCondition)
  left_front_tire_condition?: TireCondition

  @ApiPropertyOptional({ 
    description: 'Right front tire condition',
    enum: TireCondition,
    example: TireCondition.NORMAL 
  })
  @IsOptional()
  @IsEnum(TireCondition)
  right_front_tire_condition?: TireCondition

  @ApiPropertyOptional({ 
    description: 'Left back tire condition',
    enum: TireCondition,
    example: TireCondition.NORMAL 
  })
  @IsOptional()
  @IsEnum(TireCondition)
  left_back_tire_condition?: TireCondition

  @ApiPropertyOptional({ 
    description: 'Right back tire condition',
    enum: TireCondition,
    example: TireCondition.NORMAL 
  })
  @IsOptional()
  @IsEnum(TireCondition)
  right_back_tire_condition?: TireCondition

  @ApiPropertyOptional({ 
    description: 'Left front tire damage type',
    enum: TireDamage,
    example: TireDamage.UNEVEN_WEAR 
  })
  @IsOptional()
  @IsEnum(TireDamage)
  left_front_tire_damage?: TireDamage

  @ApiPropertyOptional({ 
    description: 'Right front tire damage type',
    enum: TireDamage,
    example: TireDamage.UNEVEN_WEAR 
  })
  @IsOptional()
  @IsEnum(TireDamage)
  right_front_tire_damage?: TireDamage

  @ApiPropertyOptional({ 
    description: 'Left back tire damage type',
    enum: TireDamage,
    example: TireDamage.UNEVEN_WEAR 
  })
  @IsOptional()
  @IsEnum(TireDamage)
  left_back_tire_damage?: TireDamage

  @ApiPropertyOptional({ 
    description: 'Right back tire damage type',
    enum: TireDamage,
    example: TireDamage.UNEVEN_WEAR 
  })
  @IsOptional()
  @IsEnum(TireDamage)
  right_back_tire_damage?: TireDamage

  @ApiPropertyOptional({ 
    description: 'Success completion flag',
    example: true,
    type: Boolean 
  })
  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @ApiProperty({ 
    description: 'User ID who updated this step two detail',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsNotEmpty()
  @IsUUID()
  updated_by: string
}
