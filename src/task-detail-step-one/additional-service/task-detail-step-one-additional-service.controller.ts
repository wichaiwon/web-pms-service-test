import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateTaskDetailStepOneAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one-additional-service.dto'
import { UpdateTaskDetailStepOneAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-one/update-task-detail-step-one-additional-service.dto'
import { TaskDetailStepOneAdditionalServiceService } from './task-detail-step-one-additional-service.service'

@ApiTags('Task Detail Step One Additional Services')
@ApiBearerAuth('Bearer')
@Controller('task-detail-step-one-additional-service')
@UseGuards(JwtAuthGuard)
export class TaskDetailStepOneAdditionalServiceController {
  constructor(private readonly taskDetailStepOneAdditionalService: TaskDetailStepOneAdditionalServiceService) {}

  @Post()
  async create(@Body() createDto: CreateTaskDetailStepOneAdditionalServiceDto) {
    const result = await this.taskDetailStepOneAdditionalService.createTaskDetailStepOneAdditionalService(createDto)
    return {
      success: true,
      message: 'Task detail step one additional service created successfully',
      data: result,
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.taskDetailStepOneAdditionalService.getTaskDetailStepOneAdditionalServiceById(id)
    return {
      success: true,
      message: 'Additional service retrieved successfully',
      data: result,
    }
  }

  @Get('task-detail-step-one/:taskDetailStepOneId')
  async findByTaskDetailStepOneId(@Param('taskDetailStepOneId') taskDetailStepOneId: string) {
    const result = await this.taskDetailStepOneAdditionalService.getTaskDetailStepOneAdditionalServiceByTaskDetailId(
      taskDetailStepOneId,
    )
    return {
      success: true,
      message: 'Additional services retrieved successfully',
      data: result,
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepOneAdditionalServiceDto) {
    await this.taskDetailStepOneAdditionalService.updateTaskDetailStepOneAdditionalService(id, updateDto)
    return {
      success: true,
      message: 'Additional service updated successfully',
    }
  }
}
