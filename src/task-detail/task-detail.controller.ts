import { Controller, Get, Post, Put, Body, Param, UseGuards, HttpStatus, HttpCode } from '@nestjs/common'
import { TaskDetailService } from './task-detail.service'
import { CreateTaskDetailDto } from '../application/dto/tasks/task-detail/create-task-detail.dto'
import { UpdateTaskDetailDto } from '../application/dto/tasks/task-detail/update-task-detail.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('task-detail')
@UseGuards(JwtAuthGuard)
export class TaskDetailController {
  constructor(private readonly taskDetailService: TaskDetailService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTaskDetail(@Body() createDto: CreateTaskDetailDto) {
    try {
      const taskDetail = await this.taskDetailService.createTaskDetail(createDto)
      return {
        success: true,
        message: 'Task detail created successfully',
        data: taskDetail,
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }

  @Get(':id')
  async getTaskDetailById(@Param('id') id: string) {
    try {
      const taskDetail = await this.taskDetailService.getTaskDetailById(id)
      return {
        success: true,
        message: 'Task detail retrieved successfully',
        data: taskDetail,
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }

  @Get('task/:taskId')
  async getTaskDetailsByTaskId(@Param('taskId') taskId: string) {
    try {
      const taskDetails = await this.taskDetailService.getTaskDetailsByTaskId(taskId)
      return {
        success: true,
        message: 'Task details retrieved successfully',
        data: taskDetails,
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: [],
      }
    }
  }

  @Put(':id')
  async updateTaskDetail(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailDto) {
    try {
      const taskDetail = await this.taskDetailService.updateTaskDetail(id, updateDto)
      return {
        success: true,
        message: 'Task detail updated successfully',
        data: taskDetail,
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }
}
