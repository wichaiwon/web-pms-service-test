import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateTaskDetailStepThreeAdditionalServiceDto {
  @ApiPropertyOptional({ 
    description: 'Array of first battery image URLs or base64 strings',
    example: ['https://example.com/battery1-image1.jpg', 'https://example.com/battery1-image2.jpg'],
    type: [String],
    isArray: true 
  })
  @IsOptional()
  @IsString({ each: true })
  first_battery_image?: string[]

  @ApiPropertyOptional({ 
    description: 'Array of second battery image URLs or base64 strings',
    example: ['https://example.com/battery2-image1.jpg', 'https://example.com/battery2-image2.jpg'],
    type: [String],
    isArray: true 
  })
  @IsOptional()
  @IsString({ each: true })
  second_battery_image?: string[]

  @ApiPropertyOptional({ 
    description: 'Additional comments or notes for step three',
    example: 'แบตเตอรี่ตัวที่ 1 มีค่าแรงดันต่ำกว่าปกติ' 
  })
  @IsOptional()
  @IsString()
  comment?: string

  @ApiProperty({ 
    description: 'User ID who updated this step three additional service',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsNotEmpty()
  @IsUUID()
  updated_by: string
}
