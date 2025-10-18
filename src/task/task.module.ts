import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tasks } from '../domain/entities/task/task.entity'
import { Users } from '../domain/entities/user/user.entity'
import { TaskRepository } from '../infrastructure/repositories/task/task.repository'
import { UserRepository } from '../infrastructure/repositories/user.repository'
import { TaskController } from './task.controller'
import { TaskService } from './task.service'
import { CreateTaskUseCase } from './use-cases/create-task.use-case'
import { GetTaskUseCase } from './use-cases/get-task.use-case'
import { UpdateTaskUseCase } from './use-cases/update-task.use-case'

@Module({
  imports: [TypeOrmModule.forFeature([Tasks, Users])],
  controllers: [TaskController],
  providers: [
    TaskService,
    CreateTaskUseCase,
    GetTaskUseCase,
    UpdateTaskUseCase,
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [TaskService, 'ITaskRepository'],
})
export class TaskModule {}
