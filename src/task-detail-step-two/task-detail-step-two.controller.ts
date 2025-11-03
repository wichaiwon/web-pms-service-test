import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { TaskDetailStepTwoService } from './task-detail-step-two.service'
import { CreateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two.dto'
import { UpdateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two.dto'

@ApiTags('Task Detail Step Two')
@ApiBearerAuth('Bearer')
@Controller('task-detail-step-two')
@UseGuards(JwtAuthGuard)
export class TaskDetailStepTwoController {
  constructor(private readonly taskDetailStepTwoService: TaskDetailStepTwoService) {}

  @Post()
  async create(@Body() createDto: CreateTaskDetailStepTwoDto) {
    return this.taskDetailStepTwoService.createTaskDetailStepTwo(createDto)
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.taskDetailStepTwoService.getTaskDetailStepTwoById(id)
  }
  @Get('task/:taskId')
  async findByTaskId(@Param('taskId') taskId: string) {
    return this.taskDetailStepTwoService.getTaskDetailStepTwoByTaskId(taskId)
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepTwoDto) {
    return this.taskDetailStepTwoService.updateTaskDetailStepTwo(id, updateDto)
  }
}
