import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateTaskDetailStepTwoAdditionalServiceDto {
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

  @ApiProperty({ 
    description: 'User ID who updated this step two additional service',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsNotEmpty()
  @IsUUID()
  updated_by: string
}
