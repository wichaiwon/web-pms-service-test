import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: '405121010' })
  @IsString()
  @IsNotEmpty()
  mirai_id: string

  @ApiProperty({ example: 'Puy11111111' })
  @IsString()
  @IsNotEmpty()
  password: string
}
