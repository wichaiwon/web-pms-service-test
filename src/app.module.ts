import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TaskModule } from './task/task.module'
import { DatabaseModule } from './infrastructure/database/database.module'
import { TaskDetailModule } from './task-detail/task-detail.module'
import { TaskDetailStepOneModule } from './task-detail-step-one/task-detail-step-one.module'

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
