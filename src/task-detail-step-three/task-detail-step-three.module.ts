import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskDetailStepThreeAdditionalServiceEntity } from 'src/domain/entities/task/task-detail-step-three/task-detail-step-three-additional-service.entity'
import { TaskDetailStepThreeEntity } from 'src/domain/entities/task/task-detail-step-three/task-detail-step-three.entity'
import { TaskModule } from 'src/task/task.module'
import { TaskDetailStepThreeController } from './task-detail-step-three.controller'
import { TaskDetailStepThreeAdditionalServiceController } from './additional-service/task-detail-step-three-additional-service.controller'
import { TaskDetailStepThreeService } from './task-detail-step-three.service'
import { TaskDetailStepThreeAdditionalServiceService } from './additional-service/task-detail-step-three-additional-service.service'
import { TaskDetailStepThreeRepository } from 'src/infrastructure/repositories/task/task-detail-step-three/task-detail-step-three.repository'
import { TaskDetailStepThreeAdditionalServiceRepository } from 'src/infrastructure/repositories/task/task-detail-step-three/task-detail-step-three-additional-service.repository'
import { CreateTaskDetailStepThreeUseCase } from './use-cases/create-task-detail-step-three.use-case'
import { GetTaskDetailStepThreeUseCase } from './use-cases/get-task-detail-step-three.use-case'
import { UpdateTaskDetailStepThreeUseCase } from './use-cases/update-task-detail-step-three.use-case'
import { CreateTaskDetailStepThreeAdditionalServiceUseCase } from './use-cases/create-task-detail-step-three-additional-service.use-case'
import { GetTaskDetailStepThreeAdditionalServiceUseCase } from './use-cases/get-task-detail-step-three-additional-service.use-case'
import { UpdateTaskDetailStepThreeAdditionalServiceUseCase } from './use-cases/update-task-detail-step-three-additional-service.use-case'

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskDetailStepThreeEntity, TaskDetailStepThreeAdditionalServiceEntity]),
    TaskModule,
  ],
  controllers: [TaskDetailStepThreeController, TaskDetailStepThreeAdditionalServiceController],
  providers: [
    TaskDetailStepThreeService,
    TaskDetailStepThreeAdditionalServiceService,
    {
      provide: 'ITaskDetailStepThreeRepository',
      useClass: TaskDetailStepThreeRepository,
    },
    {
      provide: 'ITaskDetailStepThreeAdditionalServiceRepository',
      useClass: TaskDetailStepThreeAdditionalServiceRepository,
    },
    CreateTaskDetailStepThreeUseCase,
    GetTaskDetailStepThreeUseCase,
    UpdateTaskDetailStepThreeUseCase,
    CreateTaskDetailStepThreeAdditionalServiceUseCase,
    GetTaskDetailStepThreeAdditionalServiceUseCase,
    UpdateTaskDetailStepThreeAdditionalServiceUseCase,
  ],
  exports: [TypeOrmModule, TaskDetailStepThreeService, TaskDetailStepThreeAdditionalServiceService],
})
export class TaskDetailStepThreeModule {}
