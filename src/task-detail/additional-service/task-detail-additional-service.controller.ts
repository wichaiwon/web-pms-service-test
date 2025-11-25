import { Controller, Get, Post, Put, Body, Param, UseGuards, HttpStatus, HttpCode } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { TaskDetailAdditionalServiceService } from './task-detail-additional-service.service'
import { CreateTaskDetailAdditionalServiceDto } from 'src/application/dto/tasks/task-detail/create-task-detail-addtional-service.dto'
import { UpdateTaskDetailAdditionalServiceDto } from 'src/application/dto/tasks/task-detail/update-task-detail-additional-service.dto'

@ApiTags('Task Detail Additional Services')
@ApiBearerAuth('Bearer')
@Controller('task-detail-additional-service')
@UseGuards(JwtAuthGuard)
export class TaskDetailAdditionalServiceController {
  constructor(private readonly service: TaskDetailAdditionalServiceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateTaskDetailAdditionalServiceDto) {
    const result = await this.service.createTaskDetailAdditionalService(createDto)
    return {
      success: true,
      message: 'Task detail additional service created successfully',
      data: result,
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.service.getTaskDetailAdditionalServiceById(id)
    return {
      success: true,
      message: 'Additional service retrieved successfully',
      data: result,
    }
  }

  @Get('task-detail/:taskDetailId')
  async getByTaskDetailId(@Param('taskDetailId') taskDetailId: string) {
    const result = await this.service.getTaskDetailAdditionalServiceByTaskDetailId(taskDetailId)
    return {
      success: true,
      message: 'Additional services retrieved successfully',
      data: result,
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailAdditionalServiceDto) {
    await this.service.updateTaskDetailAdditionalService(id, updateDto)
    return {
      success: true,
      message: 'Additional service updated successfully',
    }
  }
}
