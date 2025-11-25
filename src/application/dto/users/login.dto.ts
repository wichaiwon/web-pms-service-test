import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ 
    example: '405680518',
    description: 'Mirai ID'
  })
  @IsNotEmpty({ message: 'mirai_id is required' })
  @IsString({ message: 'mirai_id must be a string' })
  @MinLength(1, { message: 'mirai_id must not be empty' })
  @MaxLength(50, { message: 'mirai_id must not exceed 50 characters' })
  mirai_id: string

  @ApiProperty({ 
    example: '1234567890',
    description: 'Password'
  })
  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @MinLength(1, { message: 'password must not be empty' })
  @MaxLength(100, { message: 'password must not exceed 100 characters' })
  password: string
}
