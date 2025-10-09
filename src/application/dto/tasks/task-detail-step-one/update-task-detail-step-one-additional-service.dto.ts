import { IsOptional } from 'class-validator'

export class UpdateTaskDetailStepOneAdditionalServiceDto {
  @IsOptional()
  additional_image?: string[]

  @IsOptional()
  comment?: string
}
