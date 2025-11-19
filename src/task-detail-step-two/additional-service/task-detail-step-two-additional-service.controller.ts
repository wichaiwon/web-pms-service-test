import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { TaskDetailStepTwoAdditionalServiceService } from './task-detail-step-two-additional-service.service'
import { CreateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/create-task-detail-step-two-additional-service.dto'
import { UpdateTaskDetailStepTwoAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-two/update-task-detail-step-two-additional-service.dto'

@ApiTags('Task Detail Step Two Additional Services')
@ApiBearerAuth('Bearer')
@Controller('task-detail-step-two/additional-service')
@UseGuards(JwtAuthGuard)
export class TaskDetailStepTwoAdditionalServiceController {
  constructor(private readonly taskDetailStepTwoAdditionalService: TaskDetailStepTwoAdditionalServiceService) {}

  @Post()
  async create(@Body() createDto: CreateTaskDetailStepTwoAdditionalServiceDto) {
    return this.taskDetailStepTwoAdditionalService.createTaskDetailStepTwoAdditionalService(createDto)
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.taskDetailStepTwoAdditionalService.getTaskDetailStepTwoAdditionalServiceById(id)
  }
  @Get('task-detail-step-two/:taskDetailStepTwoId')
  async findByTaskDetailStepTwoId(@Param('taskDetailStepTwoId') taskDetailStepTwoId: string) {
    return this.taskDetailStepTwoAdditionalService.getTaskDetailStepTwoAdditionalServiceByTaskDetailId(
      taskDetailStepTwoId,
    )
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepTwoAdditionalServiceDto) {
    return this.taskDetailStepTwoAdditionalService.updateTaskDetailStepTwoAdditionalService(id, updateDto)
  }
}
