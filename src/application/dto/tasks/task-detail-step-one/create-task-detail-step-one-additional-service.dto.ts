import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateTaskDetailStepOneAdditionalServiceDto {
  @IsNotEmpty()
  @IsUUID()
  task_detail_step_one_id: string

  @IsOptional()
  @IsString({ each: true })
  additional_image?: string[]

  @IsOptional()
  @IsString()
  comment?: string
}
