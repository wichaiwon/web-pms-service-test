import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ExternalApiService } from './external-api.service';
import { AppointmentSyncService } from './appointment-sync.service';
import { Tasks } from '../../domain/entities/task/task.entity';
import { Users } from '../../domain/entities/user/user.entity';

@Module({
  imports: [
    HttpModule.register({
      timeout: 30000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([Tasks, Users]),
    ScheduleModule.forRoot(),
  ],
  providers: [
    ExternalApiService,
    AppointmentSyncService,
  ],
  exports: [
    ExternalApiService,
    AppointmentSyncService,
  ],
})
export class ScheduleServicesModule {}