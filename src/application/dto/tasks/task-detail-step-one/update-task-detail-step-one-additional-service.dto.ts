import { IsOptional, IsString } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateTaskDetailStepOneAdditionalServiceDto {
  @ApiPropertyOptional({ 
    description: 'Array of additional image URLs or base64 strings',
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    type: [String],
    isArray: true 
  })
  @IsOptional()
  @IsString({ each: true })
  additional_image?: string[]

  @ApiPropertyOptional({ 
    description: 'Additional comments or notes for step one',
    example: 'พบรอยขีดข่วนเล็กน้อยที่กันชน' 
  })
  @IsOptional()
  @IsString()
  comment?: string
}
