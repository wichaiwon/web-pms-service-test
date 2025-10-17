import { IsNotEmpty, IsUUID, IsOptional, IsEnum, IsNumber, ValidateIf, IsString } from 'class-validator'
import { TirePressure, AdditionalService } from 'src/shared/enum/task-detail'

export class CreateTaskDetailAdditionalServiceDto {
  @IsNotEmpty()
  @IsUUID()
  task_detail_id: string

  @IsNotEmpty()
  @IsEnum(TirePressure)
  tire_pressure: TirePressure

  @IsNotEmpty()
  @IsEnum(AdditionalService)
  additional_service: AdditionalService

  // Required only if additional_service is "เติมลมยาง"
  @ValidateIf((o: CreateTaskDetailAdditionalServiceDto) => o.additional_service === AdditionalService.TIRE_INFLATION)
  @IsNotEmpty({ message: 'front_tire_pressure is required when additional_service is เติมลมยาง' })
  @IsNumber()
  front_tire_pressure?: number

  // Required only if additional_service is "เติมลมยาง"
  @ValidateIf((o: CreateTaskDetailAdditionalServiceDto) => o.additional_service === AdditionalService.TIRE_INFLATION)
  @IsNotEmpty({ message: 'back_tire_pressure is required when additional_service is เติมลมยาง' })
  @IsNumber()
  back_tire_pressure?: number

  @IsOptional()
  @IsString()
  comment?: string
}
