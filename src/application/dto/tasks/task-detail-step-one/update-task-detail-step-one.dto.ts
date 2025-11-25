import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { DamageCar } from 'src/shared/enum/task-detail-step-one'

export class UpdateTaskDetailStepOneDto {
  @ApiPropertyOptional({ 
    description: 'Session ID for tracking create/update flow',
    example: 'session-123-456' 
  })
  @IsOptional()
  @IsString()
  session_id?: string

  @ApiPropertyOptional({ 
    description: 'Car damage assessment result',
    enum: DamageCar,
    example: DamageCar.NONE 
  })
  @IsOptional()
  @IsEnum(DamageCar)
  damage_car?: DamageCar

  @ApiPropertyOptional({ 
    description: 'Car damage inspection image URL or base64 string',
    example: 'https://example.com/damage-image.jpg' 
  })
  @IsOptional()
  @IsString()
  damage_car_image?: string

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
    description: 'User ID who updated this step one detail',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsOptional()
  @IsString()
  updated_by?: string
}
