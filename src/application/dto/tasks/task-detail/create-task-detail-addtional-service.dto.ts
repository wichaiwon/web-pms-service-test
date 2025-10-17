import { IsNotEmpty, IsUUID, IsOptional, IsEnum, IsNumber, ValidateIf, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { TirePressure, AdditionalService } from 'src/shared/enum/task-detail'

export class CreateTaskDetailAdditionalServiceDto {
  @ApiProperty({ 
    description: 'Task detail ID that this additional service belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsNotEmpty()
  @IsUUID()
  task_detail_id: string

  @ApiProperty({ 
    description: 'Tire pressure type',
    enum: TirePressure,
    example: TirePressure.NORMAL 
  })
  @IsNotEmpty()
  @IsEnum(TirePressure)
  tire_pressure: TirePressure

  @ApiProperty({ 
    description: 'Type of additional service requested',
    enum: AdditionalService,
    example: AdditionalService.TIRE_INFLATION 
  })
  @IsNotEmpty()
  @IsEnum(AdditionalService)
  additional_service: AdditionalService

  @ApiPropertyOptional({ 
    description: 'Front tire pressure (required only when additional_service is TIRE_INFLATION)',
    example: 32,
    type: Number 
  })
  // Required only if additional_service is "เติมลมยาง"
  @ValidateIf((o: CreateTaskDetailAdditionalServiceDto) => o.additional_service === AdditionalService.TIRE_INFLATION)
  @IsNotEmpty({ message: 'front_tire_pressure is required when additional_service is เติมลมยาง' })
  @IsNumber()
  front_tire_pressure?: number

  @ApiPropertyOptional({ 
    description: 'Back tire pressure (required only when additional_service is TIRE_INFLATION)',
    example: 32,
    type: Number 
  })
  // Required only if additional_service is "เติมลมยาง"
  @ValidateIf((o: CreateTaskDetailAdditionalServiceDto) => o.additional_service === AdditionalService.TIRE_INFLATION)
  @IsNotEmpty({ message: 'back_tire_pressure is required when additional_service is เติมลมยาง' })
  @IsNumber()
  back_tire_pressure?: number

  @ApiPropertyOptional({ 
    description: 'Additional comments or notes',
    example: 'ลูกค้าขอให้เช็คพิเศษ' 
  })
  @IsOptional()
  @IsString()
  comment?: string
}
