import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
  HttpException,
  Patch,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger'
import { TaskService } from './task.service'
import { CreateTaskDto } from '../application/dto/tasks/create-task.dto'
import { UpdateTaskDto } from '../application/dto/tasks/update-task.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { SuccessResponseDto, ErrorResponseDto } from '../application/dto/common/response.dto'
import { Branch } from '../shared/enum/user'
import { PatchTaskEngineChassisDto } from 'src/application/dto/tasks/patch-task-engine-chassis'
import { PatchTaskSuccessFlagDto } from 'src/application/dto/tasks/patch-task-success-flag'
import { PatchTaskInProcessFlagDto } from 'src/application/dto/tasks/patch-task-in-process-flag'

@ApiTags('Tasks')
@ApiBearerAuth('Bearer')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid JWT token',
    type: ErrorResponseDto,
  })
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
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Tasks retrieved successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid JWT token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorResponseDto,
  })
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
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid JWT token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    type: ErrorResponseDto,
  })
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
  @ApiOperation({ summary: 'Get tasks by responsible user' })
  @ApiParam({
    name: 'userId',
    description: 'User UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Responsible tasks retrieved successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid user ID',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid JWT token',
    type: ErrorResponseDto,
  })
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
  @ApiOperation({ summary: 'Get tasks by status' })
  @ApiParam({
    name: 'status',
    description: 'Task status',
    example: 'active',
  })
  @ApiResponse({
    status: 200,
    description: 'Status tasks retrieved successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid status',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid JWT token',
    type: ErrorResponseDto,
  })
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

  @Get('user-branch/:userId')
  @ApiOperation({ summary: 'Get tasks by user branch (today only)' })
  @ApiParam({
    name: 'userId',
    description: 'User UUID to get their branch tasks',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'User branch tasks retrieved successfully (filtered by today\'s date)',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid user ID',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid JWT token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorResponseDto,
  })
  async getTasksByUserBranch(@Param('userId') userId: string) {
    try {
      const tasks = await this.taskService.getTasksByUserBranch(userId)
      return {
        success: true,
        message: 'User branch tasks retrieved successfully',
        data: tasks,
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred'
      const status = message.includes('not found') ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST
      throw new HttpException(
        {
          success: false,
          message,
          data: [],
        },
        status,
      )
    }
  }

  @Get('branch/:branch')
  @ApiOperation({ summary: 'Get tasks by branch (today only)' })
  @ApiParam({
    name: 'branch',
    description: 'Branch name',
    example: 'สำนักงานใหญ่',
    enum: Branch,
  })
  @ApiResponse({
    status: 200,
    description: 'Branch tasks retrieved successfully (filtered by today\'s date)',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid branch',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid JWT token',
    type: ErrorResponseDto,
  })
  async getTasksByBranch(@Param('branch') branch: Branch) {
    try {
      const tasks = await this.taskService.getTasksByBranch(branch)
      return {
        success: true,
        message: 'Branch tasks retrieved successfully',
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
  @ApiOperation({ summary: 'Update task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid JWT token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    type: ErrorResponseDto,
  })
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
  @Patch('engine-chassis/:id')
  @ApiOperation({ summary: 'Patch task engine chassis by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: PatchTaskEngineChassisDto })
  @ApiResponse({
    status: 200,
    description: 'Task engine chassis patched successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid JWT token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    type: ErrorResponseDto,
  })
  async patchTaskEngineChassis(@Param('id') id: string, @Body() patchTaskEngineChassisDto: PatchTaskEngineChassisDto) {
    try {
      await this.taskService.patchTaskEngineChassis(id, patchTaskEngineChassisDto)
      return {
        success: true,
        message: 'Task engine chassis patched successfully',
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
  @Patch('success-flag/:id')
  @ApiOperation({ summary: 'Patch task success flag by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: PatchTaskSuccessFlagDto })
  @ApiResponse({
    status: 200,
    description: 'Task success flag patched successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid JWT token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    type: ErrorResponseDto,
  })
  async patchTaskSuccessFlag(@Param('id') id: string, @Body() patchTaskSuccessFlagDto: PatchTaskSuccessFlagDto) {
    try {
      await this.taskService.patchTaskSuccessFlag(id, patchTaskSuccessFlagDto)
      return {
        success: true,
        message: 'Task success flag patched successfully',
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
  @Patch('in-process-flag/:id')
  @ApiOperation({ summary: 'Patch task in-process flag by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: PatchTaskSuccessFlagDto })
  @ApiResponse({
    status: 200,
    description: 'Task in-process flag patched successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid JWT token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    type: ErrorResponseDto,
  })
  async patchTaskInProcessFlag(@Param('id') id: string, @Body() patchTaskInProcessFlagDto: PatchTaskInProcessFlagDto) {
    try {
      await this.taskService.patchTaskInProcessFlag(id, patchTaskInProcessFlagDto)
      return {
        success: true,
        message: 'Task in-process flag patched successfully',
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
