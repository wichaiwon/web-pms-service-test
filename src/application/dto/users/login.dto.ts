import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: '405121010' })
  @IsNotEmpty()
  @IsString()
  mirai_id: string

  @ApiProperty({ example: 'Puy11111111' })
  @IsNotEmpty()
  @IsString()
  password: string
}
