import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { SignatureCustomer } from 'src/shared/enum/task-detail-step-four'

export class CreateTaskDetailStepFourDto {
  @IsNotEmpty()
  @IsUUID()
  task_id: string

  @IsNotEmpty()
  @IsString()
  signature_customer: string

  @IsNotEmpty()
  @IsEnum(SignatureCustomer)
  signature_status: SignatureCustomer

  @IsOptional()
  @IsBoolean()
  customer_absent_flag?: boolean

  @IsOptional()
  @IsBoolean()
  success_flag?: boolean

  @IsNotEmpty()
  @IsUUID()
  created_by: string
}
