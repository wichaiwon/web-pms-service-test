import { IsOptional, IsEnum, IsNumber, IsString } from 'class-validator'
import { AdditionalService, TirePressure } from 'src/shared/enum/task-detail'

export class UpdateTaskDetailAdditionalServiceDto {
  @IsOptional()
  @IsEnum(TirePressure)
  tire_pressure?: TirePressure

  @IsOptional()
  @IsEnum(AdditionalService)
  additional_service?: AdditionalService

  @IsOptional()
  @IsNumber()
  front_tire_pressure?: number

  @IsOptional()
  @IsNumber()
  back_tire_pressure?: number

  @IsOptional()
  @IsString()
  comment?: string
}
