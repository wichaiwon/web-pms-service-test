import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskDetailStepOneAdditionalService } from 'src/domain/entities/task/task-detail-step-one/task-detail-step-one-additional-service.entity'
import { TaskDetailStepOne } from 'src/domain/entities/task/task-detail-step-one/task-detail-step-one.entity'
import { TaskDetailStepOneController } from './task-detail-step-one.controller'
import { TaskDetailStepOneAdditionalServiceController } from './additional-service/task-detail-step-one-additional-service.controller'
import { TaskDetailStepOneService } from './task-detail-step-one.service'
import { TaskDetailStepOneAdditionalServiceService } from './additional-service/task-detail-step-one-additional-service.service'
import { TaskDetailStepOneRepository } from 'src/infrastructure/repositories/task/task-detail-step-one/task-detail-step-one.repository'
import { TaskDetailStepOneAdditionalServiceRepository } from 'src/infrastructure/repositories/task/task-detail-step-one/task-detail-step-one-additional-service.repository'
import { CreateTaskDetailStepOneUseCase } from './use-cases/create-task-detail-step-one.use-case'
import { GetTaskDetailStepOneUseCase } from './use-cases/get-task-detail-step-one.use-case'
import { UpdateTaskDetailStepOneUseCase } from './use-cases/update-task-detail-step-one.use-case'
import { CreateTaskDetailStepOneAdditionalServiceUseCase } from './use-cases/create-task-detail-step-one-additional-service.use-case'
import { GetTaskDetailStepOneAdditionalServiceUseCase } from './use-cases/get-task-detail-step-one-additional-service.use-case'
import { UpdateTaskDetailStepOneAdditionalServiceUseCase } from './use-cases/update-task-detail-step-one-additional-service.use-case'
import { TaskModule } from 'src/task/task.module'

@Module({
  imports: [TypeOrmModule.forFeature([TaskDetailStepOne, TaskDetailStepOneAdditionalService]), TaskModule],
  controllers: [TaskDetailStepOneController, TaskDetailStepOneAdditionalServiceController],
  providers: [
    TaskDetailStepOneService,
    TaskDetailStepOneAdditionalServiceService,
    {
      provide: 'ITaskDetailStepOneRepository',
      useClass: TaskDetailStepOneRepository,
    },
    {
      provide: 'ITaskDetailStepOneAdditionalServiceRepository',
      useClass: TaskDetailStepOneAdditionalServiceRepository,
    },
    CreateTaskDetailStepOneUseCase,
    GetTaskDetailStepOneUseCase,
    UpdateTaskDetailStepOneUseCase,
    CreateTaskDetailStepOneAdditionalServiceUseCase,
    GetTaskDetailStepOneAdditionalServiceUseCase,
    UpdateTaskDetailStepOneAdditionalServiceUseCase,
  ],
  exports: [TaskDetailStepOneService, TaskDetailStepOneAdditionalServiceService],
})
export class TaskDetailStepOneModule {}
