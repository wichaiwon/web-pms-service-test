import { IsString, IsNotEmpty, IsEnum, IsOptional, IsTimeZone } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from 'src/shared/enum/user'
import { Branch } from 'src/shared/enum/user'

export class RegisterDto {
  @ApiProperty({ example: '5608216' })
  @IsString()
  @IsNotEmpty()
  pkg_id_member: string
  
  @ApiProperty({ example: '405121010' })
  @IsString()
  @IsNotEmpty()
  mirai_id: string

  @ApiProperty({ example: 'Puy11111111' })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({ example: 'อนุสสรา' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: 'โตสุข' })
  @IsString()
  @IsNotEmpty()
  surname: string

  @ApiProperty({example: '123456'})
  @IsString()
  @IsOptional()
  pin_code?: string

  @ApiProperty({ example: 'admin', enum: UserRole, default: UserRole.ADMIN })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole

  @ApiProperty({ example: 'head_office', enum: Branch, default: Branch.HEAD_OFFICE })
  @IsEnum(Branch)
  @IsOptional()
  branch?: Branch
}
