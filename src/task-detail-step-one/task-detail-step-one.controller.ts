import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { TaskDetailStepOneService } from './task-detail-step-one.service'
import { CreateTaskDetailStepOneDto } from 'src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one.dto'
import { UpdateTaskDetailStepOneDto } from 'src/application/dto/tasks/task-detail-step-one/update-task-detail-step-one.dto'

@ApiTags('Task Detail Step One')
@ApiBearerAuth('Bearer')
@Controller('task-detail-step-one')
@UseGuards(JwtAuthGuard)
export class TaskDetailStepOneController {
  constructor(private readonly taskDetailStepOneService: TaskDetailStepOneService) {}

  @Post()
  async create(@Body() createDto: CreateTaskDetailStepOneDto) {
    const result = await this.taskDetailStepOneService.createTaskDetailStepOne(createDto)
    return {
      success: true,
      message: 'Task detail step one created successfully',
      data: result,
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.taskDetailStepOneService.getTaskDetailStepOneById(id)
    return {
      success: true,
      message: 'Task detail step one retrieved successfully',
      data: result,
    }
  }

  @Get('task/:taskId')
  async findByTaskId(@Param('taskId') taskId: string) {
    const result = await this.taskDetailStepOneService.getTaskDetailStepOneByTaskId(taskId)
    return {
      success: true,
      message: 'Task detail step one retrieved successfully',
      data: result,
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepOneDto) {
    await this.taskDetailStepOneService.updateTaskDetailStepOne(id, updateDto)
    return {
      success: true,
      message: 'Task detail step one updated successfully',
    }
  }
}
