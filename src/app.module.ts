import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TaskModule } from './task/task.module'
import { DatabaseModule } from './infrastructure/database/database.module'
import { TaskDetailModule } from './task-detail/task-detail.module'

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
