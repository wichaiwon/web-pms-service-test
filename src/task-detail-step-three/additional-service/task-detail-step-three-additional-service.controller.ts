import { Body, Controller, Get, Post, Put, Param, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { TaskDetailStepThreeAdditionalServiceService } from './task-detail-step-three-additional-service.service'
import { CreateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three-additional-service.dto'
import { UpdateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/update-task-detail-step-three-additional-service'

@ApiTags('Task Detail Step Three Additional Services')
@ApiBearerAuth('Bearer')
@Controller('task-detail-step-three-additional-service')
@UseGuards(JwtAuthGuard)
export class TaskDetailStepThreeAdditionalServiceController {
  constructor(private readonly taskDetailStepThreeAdditionalService: TaskDetailStepThreeAdditionalServiceService) {}
  @Post()
  async create(@Body() createDto: CreateTaskDetailStepThreeAdditionalServiceDto) {
    const result = await this.taskDetailStepThreeAdditionalService.create(createDto)
    return {
      success: true,
      message: 'Task detail step three additional service created successfully',
      data: result,
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.taskDetailStepThreeAdditionalService.findById(id)
    return {
      success: true,
      message: 'Additional service retrieved successfully',
      data: result,
    }
  }

  @Get('task-detail-step-three/:taskDetailStepThreeId')
  async findByTaskDetailStepThreeId(@Param('taskDetailStepThreeId') taskDetailStepThreeId: string) {
    const result = await this.taskDetailStepThreeAdditionalService.findByTaskDetailStepThreeId(taskDetailStepThreeId)
    return {
      success: true,
      message: 'Additional services retrieved successfully',
      data: result,
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepThreeAdditionalServiceDto) {
    await this.taskDetailStepThreeAdditionalService.update(id, updateDto)
    return {
      success: true,
      message: 'Additional service updated successfully',
    }
  }
}
