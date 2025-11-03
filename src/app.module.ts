import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TaskModule } from './task/task.module'
import { DatabaseModule } from './infrastructure/database/database.module'
import { TaskDetailModule } from './task-detail/task-detail.module'
import { TaskDetailStepOneModule } from './task-detail-step-one/task-detail-step-one.module'
import { TaskDetailStepTwoModule } from './task-detail-step-two/task-detail-step-two.module'
import { TaskDetailStepThreeModule } from './task-detail-step-three/task-detail-step-three.module'
import { TaskDetailStepFourModule } from './task-detail-step-four/task-detail-step-four.module'
import { AppointmentModule } from './appointment/appointment.module'
import { UploadImageModule } from './upload-image/upload-image.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    TaskModule,
    TaskDetailModule,
    TaskDetailStepOneModule,
    TaskDetailStepTwoModule,
    TaskDetailStepThreeModule,
    TaskDetailStepFourModule,
    AppointmentModule,
    UploadImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
