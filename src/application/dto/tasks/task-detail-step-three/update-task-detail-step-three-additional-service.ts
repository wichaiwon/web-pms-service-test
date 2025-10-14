import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";


export class UpdateTaskDetailStepThreeAdditionalServiceDto {
    @IsOptional()
    first_battery_image?: string[];

    @IsOptional()
    second_battery_image?: string[];

    @IsOptional()
    comment?: string;

    @IsNotEmpty()
    @IsUUID()
    updated_by: string;
}