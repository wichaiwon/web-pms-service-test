import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { SignatureCustomer } from 'src/shared/enum/task-detail-step-four'

export class UpdateTaskDetailStepFourDto {
  @IsOptional()
  @IsString()
  signature_customer?: string

  @IsOptional()
  @IsEnum(SignatureCustomer)
  signature_status?: SignatureCustomer

  @IsOptional()
  @IsBoolean()
  customer_absent_flag?: boolean

  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @IsNotEmpty()
  @IsUUID()
  updated_by: string
}
