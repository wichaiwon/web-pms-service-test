import { IsString, IsNotEmpty, IsEnum, IsOptional, IsTimeZone } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from 'src/shared/enum/user'
import { Branch } from 'src/shared/enum/user'

export class RegisterDto {
  @ApiProperty({ example: '5608216' })
  @IsNotEmpty()
  @IsString()
  pkg_id_member: string
  
  @ApiProperty({ example: '405121010' })
  @IsNotEmpty()
  @IsString()
  mirai_id: string

  @ApiProperty({ example: 'Puy11111111' })
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiProperty({ example: 'อนุสสรา' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ example: 'โตสุข' })
  @IsNotEmpty()
  @IsString()
  surname: string

  @ApiProperty({example: '123456'})
  @IsOptional()
  @IsString()
  pin_code?: string

  @ApiProperty({ example: 'admin', enum: UserRole, default: UserRole.ADMIN })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole

  @ApiProperty({ example: 'head_office', enum: Branch, default: Branch.HEAD_OFFICE })
  @IsOptional()
  @IsEnum(Branch)
  branch?: Branch
}
