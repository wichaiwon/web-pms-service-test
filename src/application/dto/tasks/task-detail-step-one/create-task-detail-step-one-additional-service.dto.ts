import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateTaskDetailStepOneAdditionalServiceDto {
  @ApiProperty({ 
    description: 'Task detail step one ID that this additional service belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsNotEmpty()
  @IsUUID()
  task_detail_step_one_id: string

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
