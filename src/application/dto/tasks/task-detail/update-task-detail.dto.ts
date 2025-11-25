import { IsOptional, IsEnum, IsNumber, IsBoolean, IsString } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { FuelLevel } from 'src/shared/enum/task-detail'

export class UpdateTaskDetailDto {
  @ApiPropertyOptional({ 
    description: 'Session ID for tracking create/update flow',
    example: 'session-123-456' 
  })
  @IsOptional()
  @IsString()
  session_id?: string

  @ApiPropertyOptional({ 
    description: 'First task detail image URL or base64 string',
    example: 'https://example.com/image1.jpg' 
  })
  @IsOptional()
  @IsString()
  task_detail_image1?: string

  @ApiPropertyOptional({ 
    description: 'Second task detail image URL or base64 string',
    example: 'https://example.com/image2.jpg' 
  })
  @IsOptional()
  @IsString()
  task_detail_image2?: string

  @ApiPropertyOptional({ 
    description: 'Car mileage at the time of service',
    example: 50000 
  })
  @IsOptional()
  @IsNumber()
  car_mileage?: number

  @ApiPropertyOptional({ 
    description: 'Fuel level gauge reading',
    enum: FuelLevel,
    example: FuelLevel.LEVEL_25 
  })
  @IsOptional()
  @IsEnum(FuelLevel)
  fuel_level?: FuelLevel

  @ApiPropertyOptional({ 
    description: 'Success completion flag',
    example: true,
    type: Boolean 
  })
  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @ApiPropertyOptional({ 
    description: 'Active status flag',
    example: true,
    type: Boolean 
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean

  @ApiPropertyOptional({ 
    description: 'User ID who updated this task detail',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsOptional()
  updated_by?: string
}
