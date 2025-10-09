import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tasks } from '../domain/entities/task/task.entity'
import { TaskRepository } from '../infrastructure/repositories/task/task.repository'
import { TaskController } from './task.controller'
import { TaskService } from './task.service'
import { CreateTaskUseCase } from './use-cases/create-task.use-case'
import { GetTaskUseCase } from './use-cases/get-task.use-case'
import { UpdateTaskUseCase } from './use-cases/update-task.use-case'

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasks])
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    // Use Cases
    CreateTaskUseCase,
    GetTaskUseCase,
    UpdateTaskUseCase,
    // Repository
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
  ],
  exports: [
    TaskService,
    'ITaskRepository',
  ],
})
export class TaskModule {}
