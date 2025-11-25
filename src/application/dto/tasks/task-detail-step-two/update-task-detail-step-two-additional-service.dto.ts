import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateTaskDetailStepTwoAdditionalServiceDto {
  @ApiPropertyOptional({ 
    description: 'Session ID for tracking create/update flow',
    example: 'session-123-456' 
  })
  @IsOptional()
  @IsString()
  session_id?: string

  @ApiPropertyOptional({ 
    description: 'Array of left front tire image URLs or base64 strings',
    example: ['https://example.com/left-front-tire1.jpg', 'https://example.com/left-front-tire2.jpg'],
    type: [String],
    isArray: true 
  })
  @IsOptional()
  @IsString({ each: true })
  left_front_tire_image?: string[]

  @ApiPropertyOptional({ 
    description: 'Array of right front tire image URLs or base64 strings',
    example: ['https://example.com/right-front-tire1.jpg', 'https://example.com/right-front-tire2.jpg'],
    type: [String],
    isArray: true 
  })
  @IsOptional()
  @IsString({ each: true })
  right_front_tire_image?: string[]

  @ApiPropertyOptional({ 
    description: 'Array of left back tire image URLs or base64 strings',
    example: ['https://example.com/left-back-tire1.jpg', 'https://example.com/left-back-tire2.jpg'],
    type: [String],
    isArray: true 
  })
  @IsOptional()
  @IsString({ each: true })
  left_back_tire_image?: string[]

  @ApiPropertyOptional({ 
    description: 'Array of right back tire image URLs or base64 strings',
    example: ['https://example.com/right-back-tire1.jpg', 'https://example.com/right-back-tire2.jpg'],
    type: [String],
    isArray: true 
  })
  @IsOptional()
  @IsString({ each: true })
  right_back_tire_image?: string[]

  @ApiPropertyOptional({ 
    description: 'Additional comments or notes for step two',
    example: 'ยางหน้าซ้ายมีรอยสึกผิดปกติ' 
  })
  @IsOptional()
  @IsString()
  comment?: string
}
