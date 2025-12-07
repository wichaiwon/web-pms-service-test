import { IsNotEmpty, IsUUID, IsOptional, IsBoolean, IsEnum, IsArray, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { StatusRepairOrder, StatusReport } from 'src/shared/enum/task'

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Vehicle registration number',
    example: 'กข 1234',
  })
  @IsOptional()
  @IsString()
  vehicle_registration?: string

  @ApiPropertyOptional({
    description: 'Vehicle model number',
    example: 'Civic 2020',
  })
  @IsOptional()
  @IsString()
  model_number?: string


  @ApiPropertyOptional({
    description: 'Vehicle model name',
    example: 'Honda Civic',
  })
  @IsOptional()
  @IsString()
  model_name?: string

  @ApiPropertyOptional({
    description: 'Vehicle registration province',
    example: 'กรุงเทพมหานคร',
  })
  @IsOptional()
  @IsString()
  vehicle_registration_province?: string

  @ApiPropertyOptional({
    description: 'Vehicle VIN number',
    example: '1HGBH41JXMN109186',
  })
  @IsOptional()
  @IsString()
  vin_number?: string

  @ApiPropertyOptional({
    description: 'Engine number',
    example: '4G63T123456',
  })
  @IsOptional()
  @IsString()
  engine_number?: string

  @ApiPropertyOptional({
    description: 'Chassis number',
    example: 'JHMCM56557C404453',
  })
  @IsOptional()
  @IsString()
  chassis_number?: string

  @ApiPropertyOptional({
    description: 'Array of responsible user UUIDs',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    type: [String],
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  responsible?: string[]

  @ApiPropertyOptional({
    description: 'Lift assignment',
    example: 'Lift A1',
  })
  @IsOptional()
  @IsString()
  lift?: string

  @ApiPropertyOptional({
    description: 'Repair order status',
    enum: StatusRepairOrder,
  })
  @IsOptional()
  @IsEnum(StatusRepairOrder)
  status_repair_order?: StatusRepairOrder

  @ApiPropertyOptional({
    description: 'Report status',
    enum: StatusReport,
  })
  @IsOptional()
  @IsEnum(StatusReport)
  status_report?: StatusReport

  @ApiPropertyOptional({
    description: 'Active status flag',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean

  @ApiPropertyOptional({
    description: 'User ID who updated this task',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  updated_by?: string
}
