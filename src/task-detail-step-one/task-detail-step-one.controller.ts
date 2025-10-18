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
    return this.taskDetailStepOneService.createTaskDetailStepOne(createDto)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.taskDetailStepOneService.getTaskDetailStepOneById(id)
  }

  @Get('task/:taskId')
  async findByTaskId(@Param('taskId') taskId: string) {
    return this.taskDetailStepOneService.getTaskDetailStepOneByTaskId(taskId)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepOneDto) {
    return this.taskDetailStepOneService.updateTaskDetailStepOne(id, updateDto)
  }
}
