import { ApiProperty } from '@nestjs/swagger'

export class SuccessResponseDto {
  @ApiProperty({ 
    description: 'Operation success status',
    example: true 
  })
  success: boolean

  @ApiProperty({ 
    description: 'Response message',
    example: 'Operation completed successfully' 
  })
  message: string

  @ApiProperty({ 
    description: 'Response data',
    example: {} 
  })
  data: any
}

export class ErrorResponseDto {
  @ApiProperty({ 
    description: 'Operation success status',
    example: false 
  })
  success: boolean

  @ApiProperty({ 
    description: 'Error message',
    example: 'An error occurred' 
  })
  message: string

  @ApiProperty({ 
    description: 'Error data',
    example: null 
  })
  data: any
}