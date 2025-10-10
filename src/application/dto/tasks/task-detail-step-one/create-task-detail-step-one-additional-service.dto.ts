import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class CreateTaskDetailStepOneAdditionalServiceDto {
  @IsNotEmpty()
  @IsUUID()
  task_detail_step_one_id: string
  
  @IsOptional()
  additional_image?: string[]

  @IsOptional()
  comment?: string
}
