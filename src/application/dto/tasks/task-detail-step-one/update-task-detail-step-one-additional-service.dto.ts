import { IsOptional, IsString } from 'class-validator'

export class UpdateTaskDetailStepOneAdditionalServiceDto {
  @IsOptional()
  additional_image?: string[]

  @IsOptional()
  @IsString()
  comment?: string
}
