import { Controller, Get, Post, Put, Body, Param, UseGuards, HttpStatus, HttpCode, HttpException } from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from '../application/dto/tasks/create-task.dto'
import { UpdateTaskDto } from '../application/dto/tasks/update-task.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    try {
      const task = await this.taskService.createTask(createTaskDto)
      return {
        success: true,
        message: 'Task created successfully',
        data: task,
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred'
      throw new HttpException(
        {
          success: false,
          message,
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  @Get()
  async getAllTasks() {
    try {
      const tasks = await this.taskService.getAllTasks()
      return {
        success: true,
        message: 'Tasks retrieved successfully',
        data: tasks,
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred'
      throw new HttpException(
        {
          success: false,
          message,
          data: [],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    try {
      const task = await this.taskService.getTaskById(id)
      return {
        success: true,
        message: 'Task retrieved successfully',
        data: task,
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred'
      throw new HttpException(
        {
          success: false,
          message,
          data: null,
        },
        HttpStatus.NOT_FOUND,
      )
    }
  }

  @Get('responsible/:userId')
  async getTasksByResponsible(@Param('userId') userId: string) {
    try {
      const tasks = await this.taskService.getTasksByResponsible(userId)
      return {
        success: true,
        message: 'Responsible tasks retrieved successfully',
        data: tasks,
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred'
      throw new HttpException(
        {
          success: false,
          message,
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  @Get('status/:status')
  async getTasksByStatus(@Param('status') status: string) {
    try {
      const tasks = await this.taskService.getTasksByStatus(status)
      return {
        success: true,
        message: 'Status tasks retrieved successfully',
        data: tasks,
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred'
      throw new HttpException(
        {
          success: false,
          message,
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskService.updateTask(id, updateTaskDto)
      return {
        success: true,
        message: 'Task updated successfully',
        data: task,
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred'
      throw new HttpException(
        {
          success: false,
          message,
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
