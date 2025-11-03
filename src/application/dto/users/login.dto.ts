import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: '405680518' })
  @IsNotEmpty()
  @IsString()
  mirai_id: string

  @ApiProperty({ example: '1234567890' })
  @IsNotEmpty()
  @IsString()
  password: string
}
