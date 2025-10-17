import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from 'src/shared/enum/user'
import { Branch } from 'src/shared/enum/user'

export class RegisterDto {
  @ApiProperty({ example: '6805018' })
  @IsNotEmpty()
  @IsString()
  pkg_id_member: string

  @ApiProperty({ example: '405680518' })
  @IsNotEmpty()
  @IsString()
  mirai_id: string

  @ApiProperty({ example: 'wichai.wongfu.pkg@gmail.com' })
  @IsOptional()
  @IsString()
  email: string

  @ApiProperty({ example: '1234567890' })
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiProperty({ example: 'วิชัย' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ example: 'วงค์ฟู' })
  @IsNotEmpty()
  @IsString()
  surname: string

  @ApiProperty({ example: '123456' })
  @IsOptional()
  @IsString()
  pin_code?: string

  @ApiProperty({ example: 'admin', enum: UserRole, default: UserRole.ADMIN })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole

  @ApiProperty({ example: 'สำนักงานใหญ่', enum: Branch, default: Branch.HEAD_OFFICE })
  @IsOptional()
  @IsEnum(Branch)
  branch?: Branch
}
