import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskDetailStepTwoAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-two/task-detail-step-two-additional-service.entity'
import { TaskDetailStepTwoEntity } from 'src/domain/entities/task/task-detail-step-two/task-detail-step-two.entity'
import { TaskModule } from 'src/task/task.module'
import { TaskDetailStepTwoController } from './task-detail-step-two.controller'
import { TaskDetailStepTwoAdditionalServiceController } from './additional-service/task-detail-step-two-additional-service.controller'
import { TaskDetailStepTwoService } from './task-detail-step-two.service'
import { TaskDetailStepTwoAdditionalServiceService } from './additional-service/task-detail-step-two-additional-service.service'
import { TaskDetailStepTwoRepository } from 'src/infrastructure/repositories/task/task-detail-step-two/task-detail-step-two.repository'
import { TaskDetailStepTwoAdditionalServiceRepository } from 'src/infrastructure/repositories/task/task-detail-step-two/task-detail-step-two-additional-service.repository'
import { CreateTaskDetailStepTwoUseCase } from './use-cases/create-task-detail-step-two.use-case'
import { GetTaskDetailStepTwoUseCase } from './use-cases/get-task-detail-step-two.use-case'
import { UpdateTaskDetailStepTwoUseCase } from './use-cases/update-task-detail-step-two.use-case'
import { CreateTaskDetailStepTwoAdditionalServiceUseCase } from './use-cases/create-task-detail-step-two-additional-service.use-case'
import { GetTaskDetailStepTwoAdditionalServiceUseCase } from './use-cases/get-task-detail-step-two-additional-service.use-case'
import { UpdateTaskDetailStepTwoAdditionalServiceUseCase } from './use-cases/update-task-detail-step-two-additional-service.use-case'

@Module({
  imports: [TypeOrmModule.forFeature([TaskDetailStepTwoEntity, TaskDetailStepTwoAdditionalServiceEntity]), TaskModule],
  controllers: [TaskDetailStepTwoController, TaskDetailStepTwoAdditionalServiceController],
  providers: [
    TaskDetailStepTwoService,
    TaskDetailStepTwoAdditionalServiceService,
    {
      provide: 'ITaskDetailStepTwoRepository',
      useClass: TaskDetailStepTwoRepository,
    },
    {
      provide: 'ITaskDetailStepTwoAdditionalServiceRepository',
      useClass: TaskDetailStepTwoAdditionalServiceRepository,
    },
    CreateTaskDetailStepTwoUseCase,
    GetTaskDetailStepTwoUseCase,
    UpdateTaskDetailStepTwoUseCase,
    CreateTaskDetailStepTwoAdditionalServiceUseCase,
    GetTaskDetailStepTwoAdditionalServiceUseCase,
    UpdateTaskDetailStepTwoAdditionalServiceUseCase,
  ],
  exports: [TypeOrmModule, TaskDetailStepTwoService, TaskDetailStepTwoAdditionalServiceService],
})
export class TaskDetailStepTwoModule {}
