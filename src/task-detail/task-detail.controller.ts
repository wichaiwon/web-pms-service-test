import { Controller, Get, Post, Put, Body, Param, UseGuards, HttpStatus, HttpCode } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { TaskDetailService } from './task-detail.service'
import { CreateTaskDetailDto } from '../application/dto/tasks/task-detail/create-task-detail.dto'
import { UpdateTaskDetailDto } from '../application/dto/tasks/task-detail/update-task-detail.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@ApiTags('Task Details')
@ApiBearerAuth('Bearer')
@Controller('task-detail')
@UseGuards(JwtAuthGuard)
export class TaskDetailController {
  constructor(private readonly taskDetailService: TaskDetailService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTaskDetail(@Body() createDto: CreateTaskDetailDto) {
    const taskDetail = await this.taskDetailService.createTaskDetail(createDto)
    return {
      success: true,
      message: 'Task detail created successfully',
      data: taskDetail,
    }
  }

  @Get(':id')
  async getTaskDetailById(@Param('id') id: string) {
    const taskDetail = await this.taskDetailService.getTaskDetailById(id)
    return {
      success: true,
      message: 'Task detail retrieved successfully',
      data: taskDetail,
    }
  }

  @Get('task/:taskId')
  async getTaskDetailsByTaskId(@Param('taskId') taskId: string) {
    const taskDetails = await this.taskDetailService.getTaskDetailsByTaskId(taskId)
    return {
      success: true,
      message: 'Task details retrieved successfully',
      data: taskDetails,
    }
  }

  @Put(':id')
  async updateTaskDetail(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailDto) {
    const taskDetail = await this.taskDetailService.updateTaskDetail(id, updateDto)
    return {
      success: true,
      message: 'Task detail updated successfully',
      data: taskDetail,
    }
  }
}
