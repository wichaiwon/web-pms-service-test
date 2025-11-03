import { ApiProperty } from '@nestjs/swagger'

export class ApiResponseDto<T> {
  @ApiProperty({ 
    description: 'Response status',
    example: 'success' 
  })
  status: string

  @ApiProperty({ 
    description: 'Response message',
    example: 'Operation completed successfully' 
  })
  message: string

  @ApiProperty({ 
    description: 'Response data' 
  })
  data?: T

  @ApiProperty({ 
    description: 'Error details (if any)',
    required: false 
  })
  error?: any
}

export class PaginationMetaDto {
  @ApiProperty({ 
    description: 'Current page number',
    example: 1 
  })
  page: number

  @ApiProperty({ 
    description: 'Items per page',
    example: 10 
  })
  limit: number

  @ApiProperty({ 
    description: 'Total number of items',
    example: 100 
  })
  total: number

  @ApiProperty({ 
    description: 'Total number of pages',
    example: 10 
  })
  totalPages: number
}

export class PaginatedResponseDto<T> extends ApiResponseDto<T[]> {
  @ApiProperty({ 
    type: PaginationMetaDto,
    description: 'Pagination metadata' 
  })
  meta: PaginationMetaDto
}