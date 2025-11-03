import { IsNotEmpty, IsUUID, IsOptional, IsEnum, IsNumber, IsBoolean, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { FuelLevel } from 'src/shared/enum/task-detail'

export class CreateTaskDetailDto {
  @ApiProperty({ 
    description: 'Task ID that this detail belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsNotEmpty()
  @IsUUID()
  task_id: string

  @ApiProperty({ 
    description: 'First task detail image URL or base64 string',
    example: 'https://example.com/image1.jpg' 
  })
  @IsNotEmpty()
  @IsString()
  task_detail_image1: string

  @ApiProperty({ 
    description: 'Second task detail image URL or base64 string',
    example: 'https://example.com/image2.jpg' 
  })
  @IsNotEmpty()
  @IsString()
  task_detail_image2: string

  @ApiPropertyOptional({ 
    description: 'Car mileage at the time of service',
    example: 50000 
  })
  @IsOptional()
  @IsNumber()
  car_mileage?: number

  @ApiProperty({ 
    description: 'Fuel level gauge reading',
    enum: FuelLevel,
    example: FuelLevel.LEVEL_25 
  })
  @IsNotEmpty()
  @IsEnum(FuelLevel)
  fuel_level: FuelLevel

  @ApiPropertyOptional({ 
    description: 'Success completion flag',
    example: true,
    type: Boolean 
  })
  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @ApiProperty({ 
    description: 'User ID who created this task detail',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsNotEmpty()
  created_by: string
}
