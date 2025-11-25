import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { TaskDetailStepTwoAdditionalServiceService } from './task-detail-step-two-additional-service.service'
import { CreateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two-additional-service.dto'
import { UpdateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two-additional-service.dto'

@ApiTags('Task Detail Step Two Additional Services')
@ApiBearerAuth('Bearer')
@Controller('task-detail-step-two-additional-service')
@UseGuards(JwtAuthGuard)
export class TaskDetailStepTwoAdditionalServiceController {
  constructor(private readonly taskDetailStepTwoAdditionalService: TaskDetailStepTwoAdditionalServiceService) {}

  @Post()
  async create(@Body() createDto: CreateTaskDetailStepTwoAdditionalServiceDto) {
    const result = await this.taskDetailStepTwoAdditionalService.createTaskDetailStepTwoAdditionalService(createDto)
    return {
      success: true,
      message: 'Task detail step two additional service created successfully',
      data: result,
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.taskDetailStepTwoAdditionalService.getTaskDetailStepTwoAdditionalServiceById(id)
    return {
      success: true,
      message: 'Additional service retrieved successfully',
      data: result,
    }
  }

  @Get('task-detail-step-two/:taskDetailStepTwoId')
  async findByTaskDetailStepTwoId(@Param('taskDetailStepTwoId') taskDetailStepTwoId: string) {
    const result = await this.taskDetailStepTwoAdditionalService.getTaskDetailStepTwoAdditionalServiceByTaskDetailId(
      taskDetailStepTwoId,
    )
    return {
      success: true,
      message: 'Additional services retrieved successfully',
      data: result,
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepTwoAdditionalServiceDto) {
    await this.taskDetailStepTwoAdditionalService.updateTaskDetailStepTwoAdditionalService(id, updateDto)
    return {
      success: true,
      message: 'Additional service updated successfully',
    }
  }
}
