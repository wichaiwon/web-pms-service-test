import { IsOptional, IsEnum, IsNumber, IsString } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { AdditionalService, TirePressure } from 'src/shared/enum/task-detail'

export class UpdateTaskDetailAdditionalServiceDto {
  @ApiPropertyOptional({ 
    description: 'Tire pressure type',
    enum: TirePressure,
    example: TirePressure.NORMAL 
  })
  @IsOptional()
  @IsEnum(TirePressure)
  tire_pressure?: TirePressure

  @ApiPropertyOptional({ 
    description: 'Type of additional service requested',
    enum: AdditionalService,
    example: AdditionalService.TIRE_INFLATION 
  })
  @IsOptional()
  @IsEnum(AdditionalService)
  additional_service?: AdditionalService

  @ApiPropertyOptional({ 
    description: 'Front tire pressure',
    example: 32,
    type: Number 
  })
  @IsOptional()
  @IsNumber()
  front_tire_pressure?: number

  @ApiPropertyOptional({ 
    description: 'Back tire pressure',
    example: 32,
    type: Number 
  })
  @IsOptional()
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
