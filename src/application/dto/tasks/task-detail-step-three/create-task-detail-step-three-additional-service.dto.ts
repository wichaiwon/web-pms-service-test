import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateTaskDetailStepThreeAdditionalServiceDto {
  @ApiProperty({ 
    description: 'Task detail step three ID that this additional service belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsNotEmpty()
  @IsUUID()
  task_detail_step_three_id: string

  @ApiPropertyOptional({ 
    description: 'Array of first battery voltage measurement image URLs or base64 strings',
    example: ['https://example.com/battery1-voltage1.jpg', 'https://example.com/battery1-voltage2.jpg'],
    type: [String],
    isArray: true 
  })
  @IsOptional()
  @IsString({ each: true })
  first_battery_voltage_image?: string[]

  @ApiPropertyOptional({ 
    description: 'Array of second battery voltage measurement image URLs or base64 strings',
    example: ['https://example.com/battery2-voltage1.jpg', 'https://example.com/battery2-voltage2.jpg'],
    type: [String],
    isArray: true 
  })
  @IsOptional()
  @IsString({ each: true })
  second_battery_voltage_image?: string[]

  @ApiPropertyOptional({ 
    description: 'Additional comments or notes for step three',
    example: 'แบตเตอรี่ตัวที่ 1 มีค่าแรงดันต่ำกว่าปกติ' 
  })
  @IsOptional()
  @IsString()
  comment?: string
}
