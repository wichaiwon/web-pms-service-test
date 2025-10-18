import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { CreateTaskDetailStepFourDto } from 'src/application/dto/tasks/task-detail-step-four/create-task-detail-step-four.dto'
import { UpdateTaskDetailStepFourDto } from 'src/application/dto/tasks/task-detail-step-four/update-task-detail-step-four.dto'
import { TaskDetailStepFourEntity } from 'src/domain/entities/task/task-detail-step-four/task-detail-step-four.entity'
import { TaskDetailStepFourService } from './task-detail-step-four.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@ApiTags('Task Detail Step Four')
@ApiBearerAuth('Bearer')
@Controller('task-detail-step-four')
@UseGuards(JwtAuthGuard)
export class TaskDetailStepFourController {
  constructor(private readonly taskDetailStepFourService: TaskDetailStepFourService) {}

  @Post()
  async create(@Body() createDto: CreateTaskDetailStepFourDto): Promise<TaskDetailStepFourEntity> {
    return this.taskDetailStepFourService.createTaskDetailStepFour(createDto)
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<TaskDetailStepFourEntity> {
    return this.taskDetailStepFourService.getTaskDetailStepFourById(id)
  }

  @Get('task/:taskId')
  async getByTaskId(@Param('taskId') taskId: string): Promise<TaskDetailStepFourEntity[]> {
    return this.taskDetailStepFourService.getTaskDetailStepFourByTaskId(taskId)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepFourDto): Promise<{ message: string }> {
    await this.taskDetailStepFourService.updateTaskDetailStepFour(id, updateDto)
    return { message: 'Task detail step four updated successfully' }
  }
}
