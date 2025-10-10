import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskDetailAdditionalServiceEntity } from 'src/domain/entities/task/task-detail/task-detail-additional-service.entity'
import { TaskDetailEntity } from 'src/domain/entities/task/task-detail/task-detail.entity'
import { TaskModule } from 'src/task/task.module'
import { TaskDetailController } from './task-detail.controller'
import { TaskDetailAdditionalServiceController } from './additional-service/task-detail-additional-service.controller'
import { TaskDetailService } from './task-detail.service'
import { TaskDetailAdditionalServiceService } from './additional-service/task-detail-additional-service.service'
import { CreateTaskDetailUseCase } from './use-cases/create-task-detail.use-case'
import { GetTaskDetailUseCase } from './use-cases/get-task-detail.use-case'
import { UpdateTaskDetailUseCase } from './use-cases/update-task-detail.use-case'
import { CreateTaskDetailAdditionalServiceUseCase } from './use-cases/create-task-detail-additional-service.use-case'
import { GetTaskDetailAdditionalServiceUseCase } from './use-cases/get-task-detail-additional-service.use-case'
import { UpdateTaskDetailAdditionalServiceUseCase } from './use-cases/update-task-detail-additional-service.use-case'
import { TaskDetailRepository } from 'src/infrastructure/repositories/task/task-detail/task_detail.repository'
import { TaskDetailAdditionalServiceRepository } from 'src/infrastructure/repositories/task/task-detail/task-detail-additional-service.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskDetailEntity, TaskDetailAdditionalServiceEntity]),
    TaskModule
  ],
  controllers: [
    TaskDetailController,
    TaskDetailAdditionalServiceController
  ],
  providers: [
    TaskDetailService,
    TaskDetailAdditionalServiceService,
    // TaskDetail Use Cases
    CreateTaskDetailUseCase,
    GetTaskDetailUseCase,
    UpdateTaskDetailUseCase,
    // TaskDetailAdditionalService Use Cases
    CreateTaskDetailAdditionalServiceUseCase,
    GetTaskDetailAdditionalServiceUseCase,
    UpdateTaskDetailAdditionalServiceUseCase,
    // Repositories
    {
      provide: 'ITaskDetailRepository',
      useClass: TaskDetailRepository,
    },
    {
      provide: 'ITaskDetailAdditionalServiceRepository',
      useClass: TaskDetailAdditionalServiceRepository,
    },
  ],
  exports: [
    TaskDetailService,
    TaskDetailAdditionalServiceService,
    'ITaskDetailRepository',
    'ITaskDetailAdditionalServiceRepository',
  ],
})
export class TaskDetailModule {}