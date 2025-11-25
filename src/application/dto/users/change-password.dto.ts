import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ChangePasswordDto {
  @ApiProperty({ 
    description: 'Current password',
    example: 'currentPassword123' 
  })
  @IsNotEmpty({ message: 'oldPassword is required' })
  @IsString({ message: 'oldPassword must be a string' })
  @MinLength(1, { message: 'oldPassword must not be empty' })
  @MaxLength(100, { message: 'oldPassword must not exceed 100 characters' })
  oldPassword: string

  @ApiProperty({ 
    description: 'New password (minimum 6 characters)',
    example: 'newPassword123',
    minLength: 6 
  })
  @IsNotEmpty({ message: 'newPassword is required' })
  @IsString({ message: 'newPassword must be a string' })
  @MinLength(6, { message: 'newPassword must be at least 6 characters long' })
  @MaxLength(100, { message: 'newPassword must not exceed 100 characters' })
  newPassword: string
}