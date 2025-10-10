import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { TaskDetailStepTwoService } from './task-detail-step-two.service'
import { CreateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two.dto'
import { UpdateTaskDetailStepTwoDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two.dto'

@Controller('task-detail-step-two')
@UseGuards(JwtAuthGuard)
export class TaskDetailStepTwoController {
  constructor(private readonly taskDetailStepTwoService: TaskDetailStepTwoService) {}

  @Post()
  async create(@Body() createDto: CreateTaskDetailStepTwoDto) {
    return this.taskDetailStepTwoService.create(createDto)
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.taskDetailStepTwoService.findById(id)
  }
  @Get('task/:taskId')
  async findByTaskId(@Param('taskId') taskId: string) {
    return this.taskDetailStepTwoService.findByTaskId(taskId)
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepTwoDto) {
    return this.taskDetailStepTwoService.update(id, updateDto)
  }
}
