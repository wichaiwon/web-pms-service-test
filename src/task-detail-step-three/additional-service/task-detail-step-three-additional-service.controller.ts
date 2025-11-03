import { Body, Controller, Get, Post, Put, Param, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { TaskDetailStepThreeAdditionalServiceService } from './task-detail-step-three-additional-service.service'
import { CreateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/create-task-detail-step-three-additional-service.dto'
import { UpdateTaskDetailStepThreeAdditionalServiceDto } from 'src/application/dto/tasks/task-detail-step-three/update-task-detail-step-three-additional-service'

@ApiTags('Task Detail Step Three Additional Services')
@ApiBearerAuth('Bearer')
@Controller('task-detail-step-three/additional-service')
@UseGuards(JwtAuthGuard)
export class TaskDetailStepThreeAdditionalServiceController {
  constructor(private readonly taskDetailStepThreeAdditionalService: TaskDetailStepThreeAdditionalServiceService) {}
  @Post()
  async create(@Body() createDto: CreateTaskDetailStepThreeAdditionalServiceDto) {
    return this.taskDetailStepThreeAdditionalService.create(createDto)
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.taskDetailStepThreeAdditionalService.findById(id)
  }
  @Get('task-detail-step-three/:taskDetailStepThreeId')
  async findByTaskDetailStepThreeId(@Param('taskDetailStepThreeId') taskDetailStepThreeId: string) {
    return this.taskDetailStepThreeAdditionalService.findByTaskDetailStepThreeId(taskDetailStepThreeId)
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTaskDetailStepThreeAdditionalServiceDto) {
    return this.taskDetailStepThreeAdditionalService.update(id, updateDto)
  }
}
