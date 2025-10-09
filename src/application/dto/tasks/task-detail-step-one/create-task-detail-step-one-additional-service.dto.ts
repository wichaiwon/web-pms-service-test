import { IsNotEmpty, IsOptional, IsUUID, isUUID } from 'class-validator'

export class TaskDetailStepOneAdditionalServiceDto {
  @IsNotEmpty()
  @IsUUID()
  task_detail_step_one_id: string
  
  @IsOptional()
  additional_image?: string[]

  @IsOptional()
  comment?: string
}
