import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { TaskDetailStepTwoAdditionalServiceService } from './task-detail-step-two-additional-service.service'
import { CreateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two-additional-service.dto'
import { UpdateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two-additional-service.dto'

@Controller('task-detail-step-two/additional-service')
export class TaskDetailStepTwoAdditionalServiceController {
  constructor(private readonly taskDetailStepTwoAdditionalService: TaskDetailStepTwoAdditionalServiceService) {}

  @Post()
  async create(@Body() createDto: CreateTaskDetailStepTwoAdditionalServiceDto) {
    return this.taskDetailStepTwoAdditionalService.createTaskDetailStepTwoAdditionalService(createDto)
  }
  @Get(':id')
  async findById(@Body('id') id: string) {
    return this.taskDetailStepTwoAdditionalService.getTaskDetailStepTwoAdditionalServiceById(id)
  }
  @Get('task-detail-step-two/:taskDetailStepTwoId')
  async findByTaskDetailStepTwoId(@Body('taskDetailStepTwoId') taskDetailStepTwoId: string) {
    return this.taskDetailStepTwoAdditionalService.getTaskDetailStepTwoAdditionalServiceByTaskDetailId(
      taskDetailStepTwoId,
    )
  }

  @Put(':id')
  async update(@Body('id') id: string, @Body() updateDto: UpdateTaskDetailStepTwoAdditionalServiceDto) {
    return this.taskDetailStepTwoAdditionalService.updateTaskDetailStepTwoAdditionalService(id, updateDto)
  }
}
