import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { TaskDetailStepTwoService } from './task-detail-step-two.service'
import { CreateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two.dto'
import { UpdateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two.dto'

@ApiTags('Task Detail Step Two')
@ApiBearerAuth('Bearer')
@Controller('task-detail-step-two')
@UseGuards(JwtAuthGuard)
export class TaskDetailStepTwoController {
  constructor(private readonly taskDetailStepTwoService: TaskDetailStepTwoService) {}

  @Post()
  async create(@Body() createDto: CreateTaskDetailStepTwoDto) {
    const result = await this.taskDetailStepTwoService.createTaskDetailStepTwo(createDto)
    return {
      success: true,
      message: 'Task detail step two created successfully',
      data: result,
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.taskDetailStepTwoService.getTaskDetailStepTwoById(id)
    return {
      success: true,
      message: 'Task detail step two retrieved successfully',
      data: result,
    }
  }

  @Get('task/:taskId')
  async findByTaskId(@Param('taskId') taskId: string) {
    const result = await this.taskDetailStepTwoService.getTaskDetailStepTwoByTaskId(taskId)
    return {
      success: true,
      message: 'Task detail step two retrieved successfully',
      data: result,
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepTwoDto) {
    await this.taskDetailStepTwoService.updateTaskDetailStepTwo(id, updateDto)
    return {
      success: true,
      message: 'Task detail step two updated successfully',
    }
  }
}
