import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { SignatureCustomer } from 'src/shared/enum/task-detail-step-four'

export class UpdateTaskDetailStepFourDto {
  @ApiPropertyOptional({ 
    description: 'Session ID for tracking create/update flow',
    example: 'session-123-456' 
  })
  @IsOptional()
  @IsString()
  session_id?: string

  @ApiPropertyOptional({ 
    description: 'Customer signature image URL or base64 string',
    example: 'https://example.com/signature.png' 
  })
  @IsOptional()
  @IsString()
  signature_customer?: string

  @ApiPropertyOptional({ 
    description: 'Customer signature status',
    enum: SignatureCustomer 
  })
  @IsOptional()
  @IsEnum(SignatureCustomer)
  signature_status?: SignatureCustomer

  @ApiPropertyOptional({ 
    description: 'Flag indicating if customer is absent',
    example: false,
    type: Boolean 
  })
  @IsOptional()
  @IsBoolean()
  customer_absent_flag?: boolean

  @ApiPropertyOptional({ 
    description: 'Success completion flag',
    example: true,
    type: Boolean 
  })
  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @ApiPropertyOptional({ 
    description: 'User ID who updated this step four detail',
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @IsOptional()
  @IsUUID()
  updated_by?: string
}
