import { IsNotEmpty, IsUUID, IsOptional, IsBoolean, IsEnum, IsArray, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CarBrand, CarType, StatusRepairOrder, StatusReport } from 'src/shared/enum/task'
import { Branch } from 'src/shared/enum/user'

export class CreateTaskDto {
  @ApiPropertyOptional({ 
    description: 'Walk-in customer flag',
    example: false,
    type: Boolean 
  })
  @IsOptional()
  @IsBoolean()
  walk_in_flag?: boolean

  @ApiProperty({ 
    description: 'Appointment running number',
    example: 'APT-2024-001' 
  })
  @IsOptional()
  @IsString()
  appointment_running: string

  @ApiProperty({ 
    description: 'Vehicle registration number',
    example: 'กข 1234' 
  })
  @IsNotEmpty()
  @IsString()
  vehicle_registration?: string

  @ApiPropertyOptional({ 
    description: 'Vehicle registration province',
    example: 'กรุงเทพมหานคร' 
  })
  @IsOptional()
  @IsString()
  vehicle_registration_province?: string

  @ApiPropertyOptional({ 
    description: 'Vehicle model number',
    example: 'NLR85A' 
  })
  @IsOptional()
  @IsString()
  model_number?: string

  @ApiPropertyOptional({ 
    description: 'Vehicle model name',
    example: 'ISUZU ELF' 
  })
  @IsOptional()
  @IsString()
  model_name?: string

  @ApiProperty({ 
    description: 'Customer first name',
    example: 'สมชาย' 
  })
  @IsNotEmpty()
  @IsString()
  customer_firstname: string

  @ApiProperty({ 
    description: 'Customer last name',
    example: 'ใจดี' 
  })
  @IsNotEmpty()
  @IsString()
  customer_lastname: string

  @ApiProperty({ 
    description: 'Customer contact number',
    example: '0812345678' 
  })
  @IsNotEmpty()
  @IsString()
  customer_contact: string

  @ApiProperty({ 
    description: 'Booking date',
    example: '2024-10-17' 
  })
  @IsNotEmpty()
  @IsString()
  date_booked: string

  @ApiProperty({ 
    description: 'Booking time',
    example: '09:00' 
  })
  @IsNotEmpty()
  @IsString()
  time_booked: string

  @ApiPropertyOptional({ 
    description: 'Array of responsible user UUIDs',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    type: [String],
    isArray: true 
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  responsible?: string[]

  @ApiPropertyOptional({ 
    description: 'Vehicle VIN number',
    example: '1HGBH41JXMN109186' 
  })
  @IsOptional()
  @IsString()
  vin_number?: string

  @ApiPropertyOptional({ 
    description: 'Vehicle engine number',
    example: 'ENG123456' 
  })
  @IsOptional()
  @IsString()
  engine_number?: string

  @ApiPropertyOptional({ 
    description: 'Vehicle chassis number',
    example: 'CHS123456' 
  })
  @IsOptional()
  @IsString()
  chassis_number?: string

  @ApiProperty({ 
    description: 'Branch where the booking is made',
    enum: Branch,
    example: Branch.HEAD_OFFICE 
  })
  @IsNotEmpty()
  @IsEnum(Branch)
  branch_booked: Branch

  @ApiPropertyOptional({ 
    description: 'Lift assignment',
    example: 'Lift A1' 
  })
  @IsOptional()
  @IsString()
  lift?: string

  @ApiProperty({ 
    description: 'Car type',
    enum: CarType,
    example: CarType.LCV 
  })
  @IsOptional()
  @IsEnum(CarType)
  car_type?: CarType

  @ApiProperty({ 
    description: 'Car brand',
    enum: CarBrand,
    example: CarBrand.ISUZU 
  })
  @IsOptional()
  @IsEnum(CarBrand)
  car_brand?: CarBrand

  @ApiPropertyOptional({ 
    description: 'Repair order status',
    enum: StatusRepairOrder 
  })
  @IsOptional()
  @IsEnum(StatusRepairOrder)
  status_repair_order?: StatusRepairOrder

  @ApiPropertyOptional({ 
    description: 'Report status',
    enum: StatusReport 
  })
  @IsOptional()
  @IsEnum(StatusReport)
  status_report?: StatusReport

  @ApiProperty({ 
    description: 'User ID who created this task',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsNotEmpty()
  @IsUUID()
  created_by: string
}
