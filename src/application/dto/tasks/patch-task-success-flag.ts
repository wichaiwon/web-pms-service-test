import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator'

export class PatchTaskSuccessFlagDto {
  @ApiProperty({
    description: 'Success completion flag',
    example: true,
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  success_flag: boolean

    @ApiProperty({
      description: 'User ID who updated this task',
      example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    updated_by: string
}
