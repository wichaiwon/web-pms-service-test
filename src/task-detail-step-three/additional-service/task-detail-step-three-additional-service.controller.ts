import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { TaskDetailStepThreeAdditionalServiceService } from './task-detail-step-three-additional-service.service'
import { CreateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three-additional-service.dto'
import { UpdateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/update-task-detail-step-three-additional-service'

@Controller('task-detail-step-three/additional-service')
export class TaskDetailStepThreeAdditionalServiceController {
  constructor(private readonly taskDetailStepThreeAdditionalService: TaskDetailStepThreeAdditionalServiceService) {}
  @Post()
  async create(@Body() createDto: CreateTaskDetailStepThreeAdditionalServiceDto) {
    return this.taskDetailStepThreeAdditionalService.create(createDto)
  }
  @Get(':id')
  async findById(@Body('id') id: string) {
    return this.taskDetailStepThreeAdditionalService.findById(id)
  }
  @Get('task-detail-step-three/:taskDetailStepThreeId')
  async findByTaskDetailStepThreeId(@Body('taskDetailStepThreeId') taskDetailStepThreeId: string) {
    return this.taskDetailStepThreeAdditionalService.findByTaskDetailStepThreeId(taskDetailStepThreeId)
  }
  @Put(':id')
  async update(@Body('id') id: string, @Body() updateDto: UpdateTaskDetailStepThreeAdditionalServiceDto) {
    return this.taskDetailStepThreeAdditionalService.update(id, updateDto)
  }
}
