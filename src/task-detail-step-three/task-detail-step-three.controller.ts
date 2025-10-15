import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { TaskDetailStepThreeService } from './task-detail-step-three.service'
import { CreateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three.dto'
import { UpdateTaskDetailStepThreeDto } from 'src/application/dto/tasks/task-detail-step-three/update-task-detail-step-three.dto'

@Controller('task-detail-step-three')
@UseGuards(JwtAuthGuard)
export class TaskDetailStepThreeController {
  constructor(private readonly taskDetailStepThreeService: TaskDetailStepThreeService) {}

  @Post()
  async create(@Body() createDto: CreateTaskDetailStepThreeDto) {
    return this.taskDetailStepThreeService.createTaskDetailStepThree(createDto)
  }
  @Get(':id')
  async findById(@Body('id') id: string) {
    return this.taskDetailStepThreeService.getTaskDetailStepThreeById(id)
  }
  @Get('task/:taskId')
  async findByTaskId(@Param('taskId') taskId: string) {
    return this.taskDetailStepThreeService.getTaskDetailStepThreeByTaskId(taskId)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepThreeDto) {
    return this.taskDetailStepThreeService.updateTaskDetailStepThree(id, updateDto)
  }
}
