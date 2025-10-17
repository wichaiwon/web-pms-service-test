import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DamageCar } from 'src/shared/enum/task-detail-step-one'

export class CreateTaskDetailStepOneDto {
  @ApiProperty({ 
    description: 'Task ID that this step one detail belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsNotEmpty()
  @IsUUID()
  task_id: string

  @ApiProperty({ 
    description: 'Car damage assessment result',
    enum: DamageCar,
    example: DamageCar.NONE 
  })
  @IsNotEmpty()
  @IsEnum(DamageCar)
  damage_car: DamageCar

  @ApiProperty({ 
    description: 'Car damage inspection image URL or base64 string',
    example: 'https://example.com/damage-image.jpg' 
  })
  @IsNotEmpty()
  @IsString()
  damage_car_image: string

  @ApiPropertyOptional({ 
    description: 'Success completion flag',
    example: true,
    type: Boolean 
  })
  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @ApiProperty({ 
    description: 'User ID who created this step one detail',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsNotEmpty()
  @IsUUID()
  created_by: string
}
