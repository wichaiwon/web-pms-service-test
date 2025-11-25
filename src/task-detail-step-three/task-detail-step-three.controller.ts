import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { TaskDetailStepThreeService } from './task-detail-step-three.service'
import { CreateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three.dto'
import { UpdateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/update-task-detail-step-three.dto'

@ApiTags('Task Detail Step Three')
@ApiBearerAuth('Bearer')
@Controller('task-detail-step-three')
@UseGuards(JwtAuthGuard)
export class TaskDetailStepThreeController {
  constructor(private readonly taskDetailStepThreeService: TaskDetailStepThreeService) {}

  @Post()
  async create(@Body() createDto: CreateTaskDetailStepThreeDto) {
    const result = await this.taskDetailStepThreeService.createTaskDetailStepThree(createDto)
    return {
      success: true,
      message: 'Task detail step three created successfully',
      data: result,
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.taskDetailStepThreeService.getTaskDetailStepThreeById(id)
    return {
      success: true,
      message: 'Task detail step three retrieved successfully',
      data: result,
    }
  }

  @Get('task/:taskId')
  async findByTaskId(@Param('taskId') taskId: string) {
    const result = await this.taskDetailStepThreeService.getTaskDetailStepThreeByTaskId(taskId)
    return {
      success: true,
      message: 'Task detail step three retrieved successfully',
      data: result,
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepThreeDto) {
    await this.taskDetailStepThreeService.updateTaskDetailStepThree(id, updateDto)
    return {
      success: true,
      message: 'Task detail step three updated successfully',
    }
  }
}
