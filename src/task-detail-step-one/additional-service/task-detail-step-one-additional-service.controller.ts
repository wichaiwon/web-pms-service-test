import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { CreateTaskDetailStepOneAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-one/create-task-detail-step-one-additional-service.dto'
import { UpdateTaskDetailStepOneAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-one/update-task-detail-step-one-additional-service.dto'
import { TaskDetailStepOneAdditionalServiceService } from './task-detail-step-one-additional-service.service'

@Controller('task-detail-step-one-additional-service')
export class TaskDetailStepOneAdditionalServiceController {
  constructor(private readonly taskDetailStepOneAdditionalService: TaskDetailStepOneAdditionalServiceService) {}

  @Post()
  async create(@Body() createDto: CreateTaskDetailStepOneAdditionalServiceDto) {
    return this.taskDetailStepOneAdditionalService.create(createDto)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.taskDetailStepOneAdditionalService.findById(id)
  }

  @Get('task-detail-step-one/:taskDetailStepOneId')
  async findByTaskDetailStepOneId(@Param('taskDetailStepOneId') taskDetailStepOneId: string) {
    return this.taskDetailStepOneAdditionalService.findByTaskDetailStepOneId(taskDetailStepOneId)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepOneAdditionalServiceDto) {
    return this.taskDetailStepOneAdditionalService.update(id, updateDto)
  }
}