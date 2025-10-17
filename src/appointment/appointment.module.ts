import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentSyncScheduler } from './schedulers/appointment-sync.scheduler';
import { SyncAppointmentsUseCase } from './use-cases/appointment.use-case';
import { AppointmentRepository } from '../infrastructure/repositories/external/appointment.repository';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { TaskRepository } from '../infrastructure/repositories/task/task.repository';
import { Users } from '../domain/entities/user/user.entity';
import { Tasks } from '../domain/entities/task/task.entity';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Users, Tasks]),
  ],
  providers: [
    AppointmentSyncScheduler,
    SyncAppointmentsUseCase,
    {
      provide: 'IAppointmentRepository',
      useClass: AppointmentRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
  ],
  exports: [SyncAppointmentsUseCase],
})
export class AppointmentModule {}