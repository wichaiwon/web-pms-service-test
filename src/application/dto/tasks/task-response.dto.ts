import { ApiProperty } from '@nestjs/swagger'
import { CarBrand, CarType, StatusRepairOrder, StatusReport } from 'src/shared/enum/task'
import { Branch } from 'src/shared/enum/user'

export class TaskResponseDto {
  @ApiProperty({ 
    description: 'Task unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  id: string

  @ApiProperty({ 
    description: 'Walk-in customer flag',
    example: false 
  })
  walk_in_flag: boolean

  @ApiProperty({ 
    description: 'Appointment running number',
    example: 'APT-2024-001' 
  })
  appointment_running: string

  @ApiProperty({ 
    description: 'Vehicle registration number',
    example: 'กข 1234' 
  })
  vehicle_registration: string

  @ApiProperty({ 
    description: 'Vehicle registration province',
    example: 'กรุงเทพมหานคร' 
  })
  vehicle_registration_province: string

  @ApiProperty({ 
    description: 'Customer first name',
    example: 'สมชาย' 
  })
  customer_firstname: string

  @ApiProperty({ 
    description: 'Customer last name',
    example: 'ใจดี' 
  })
  customer_lastname: string

  @ApiProperty({ 
    description: 'Customer contact number',
    example: '0812345678' 
  })
  customer_contact: string

  @ApiProperty({ 
    description: 'Booking date',
    example: '2024-10-17' 
  })
  date_booked: string

  @ApiProperty({ 
    description: 'Booking time',
    example: '09:00' 
  })
  time_booked: string

  @ApiProperty({ 
    description: 'Array of responsible user UUIDs',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    isArray: true 
  })
  responsible: string[]

  @ApiProperty({ 
    description: 'Vehicle VIN number',
    example: '1HGBH41JXMN109186' 
  })
  vin_number: string

  @ApiProperty({ 
    description: 'Vehicle engine number',
    example: 'ENG123456' 
  })
  engine_number: string

  @ApiProperty({ 
    description: 'Vehicle chassis number',
    example: 'CHS123456' 
  })
  chassis_number: string

  @ApiProperty({ 
    description: 'Branch where the booking is made',
    enum: Branch,
    example: Branch.HEAD_OFFICE 
  })
  branch_book: Branch

  @ApiProperty({ 
    description: 'Lift assignment',
    example: 'Lift A1' 
  })
  lift: string

  @ApiProperty({ 
    description: 'Car type',
    enum: CarType,
    example: CarType.LCV 
  })
  car_type: CarType

  @ApiProperty({ 
    description: 'Car brand',
    enum: CarBrand,
    example: CarBrand.ISUZU 
  })
  car_brand: CarBrand

  @ApiProperty({ 
    description: 'Repair order status',
    enum: StatusRepairOrder 
  })
  status_repair_order: StatusRepairOrder

  @ApiProperty({ 
    description: 'Report status',
    enum: StatusReport 
  })
  status_report: StatusReport

  @ApiProperty({ 
    description: 'Success completion flag',
    example: true 
  })
  success_flag: boolean

  @ApiProperty({ 
    description: 'Active status flag',
    example: true 
  })
  is_active: boolean

  @ApiProperty({ 
    description: 'User ID who created this task',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  created_by: string

  @ApiProperty({ 
    description: 'User ID who updated this task',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  updated_by: string

  @ApiProperty({ 
    description: 'Creation timestamp',
    example: '2024-10-17T09:00:00.000Z' 
  })
  created_at: string

  @ApiProperty({ 
    description: 'Update timestamp',
    example: '2024-10-17T09:00:00.000Z' 
  })
  updated_at: string
}