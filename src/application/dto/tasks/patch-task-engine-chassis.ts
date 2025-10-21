import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class PatchTaskEngineChassisDto {
  @ApiProperty({
    description: 'Vehicle engine number',
    example: 'ENG123456',
  })
  @IsNotEmpty()
  @IsString()
  engine_number: string

  @ApiProperty({
    description: 'Vehicle chassis number',
    example: 'CHS123456',
  })
  @IsNotEmpty()
  @IsString()
  chassis_number: string

  @ApiProperty({
    description: 'User ID who updated this task',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  updated_by: string
}
