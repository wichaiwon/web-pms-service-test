import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskDetailStepFourEntity } from 'src/domain/entities/task/task-detail-step-four/task-detail-step-four.entity'
import { Tasks } from 'src/domain/entities/task/task.entity'
import { TaskDetailFourRepository } from 'src/infrastructure/repositories/task/task-detail-step-four/task-detail-step-four.repository'
import { TaskRepository } from 'src/infrastructure/repositories/task/task.repository'
import { TaskDetailStepFourController } from './task-detail-step-four.controller'
import { TaskDetailStepFourService } from './task-detail-step-four.service'
import { CreateTaskDetailStepFourUseCase } from './use-cases/create-task-detail-step-four.use-case'
import { GetTaskDetailStepFourUseCase } from './use-cases/get-task-detail-step-four.use-case'
import { UpdateTaskDetailStepFourUseCase } from './use-cases/update-task-detail-step-four.use-case'

@Module({
  imports: [TypeOrmModule.forFeature([TaskDetailStepFourEntity, Tasks])],
  controllers: [TaskDetailStepFourController],
  providers: [
    TaskDetailStepFourService,
    {
      provide: 'ITaskDetailStepFourRepository',
      useClass: TaskDetailFourRepository,
    },
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
    CreateTaskDetailStepFourUseCase,
    GetTaskDetailStepFourUseCase,
    UpdateTaskDetailStepFourUseCase,
  ],
  exports: [TaskDetailStepFourService],
})
export class TaskDetailStepFourModule {}
