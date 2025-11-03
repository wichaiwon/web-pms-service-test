import { IsString, IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ChangePasswordDto {
  @ApiProperty({ 
    description: 'Current password',
    example: 'currentPassword123' 
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string

  @ApiProperty({ 
    description: 'New password (minimum 6 characters)',
    example: 'newPassword123',
    minLength: 6 
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string
}