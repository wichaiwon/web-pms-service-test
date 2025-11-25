import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { CreateTaskDetailStepFourDto } from 'src/application/dto/tasks/task-detail-step-four/create-task-detail-step-four.dto'
import { UpdateTaskDetailStepFourDto } from 'src/application/dto/tasks/task-detail-step-four/update-task-detail-step-four.dto'
import { TaskDetailStepFourService } from './task-detail-step-four.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@ApiTags('Task Detail Step Four')
@ApiBearerAuth('Bearer')
@Controller('task-detail-step-four')
@UseGuards(JwtAuthGuard)
export class TaskDetailStepFourController {
  constructor(private readonly taskDetailStepFourService: TaskDetailStepFourService) {}

  @Post()
  async create(@Body() createDto: CreateTaskDetailStepFourDto) {
    const result = await this.taskDetailStepFourService.createTaskDetailStepFour(createDto)
    return {
      success: true,
      message: 'Task detail step four created successfully',
      data: result,
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.taskDetailStepFourService.getTaskDetailStepFourById(id)
    return {
      success: true,
      message: 'Task detail step four retrieved successfully',
      data: result,
    }
  }

  @Get('task/:taskId')
  async getByTaskId(@Param('taskId') taskId: string) {
    const result = await this.taskDetailStepFourService.getTaskDetailStepFourByTaskId(taskId)
    return {
      success: true,
      message: 'Task detail step four retrieved successfully',
      data: result,
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepFourDto) {
    await this.taskDetailStepFourService.updateTaskDetailStepFour(id, updateDto)
    return {
      success: true,
      message: 'Task detail step four updated successfully',
    }
  }
}
