import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateTaskDetailStepThreeDto {
  @ApiPropertyOptional({ 
    description: 'Session ID for tracking create/update flow',
    example: 'session-123-456' 
  })
  @IsOptional()
  @IsString()
  session_id?: string

  @ApiPropertyOptional({ 
    description: 'First battery voltage measurement (V)',
    example: 12.6 
  })
  @IsOptional()
  @IsNumber()
  first_battery_voltage?: number

  @ApiPropertyOptional({ 
    description: 'Second battery voltage measurement (V)',
    example: 12.4 
  })
  @IsOptional()
  @IsNumber()
  second_battery_voltage?: number

  @ApiPropertyOptional({ 
    description: 'First measurement value',
    example: 850 
  })
  @IsOptional()
  @IsNumber()
  first_measurement?: number

  @ApiPropertyOptional({ 
    description: 'Second measurement value',
    example: 830 
  })
  @IsOptional()
  @IsNumber()
  second_measurement?: number

  @ApiPropertyOptional({ 
    description: 'First rating value',
    example: 95 
  })
  @IsOptional()
  @IsNumber()
  first_rating?: number

  @ApiPropertyOptional({ 
    description: 'Second rating value',
    example: 92 
  })
  @IsOptional()
  @IsNumber()
  second_rating?: number

  @ApiPropertyOptional({ 
    description: 'Success completion flag',
    example: true,
    type: Boolean 
  })
  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @ApiPropertyOptional({ 
    description: 'User ID who updated this step three detail',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsOptional()
  @IsUUID()
  updated_by?: string
}
