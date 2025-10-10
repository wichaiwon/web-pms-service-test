import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Users } from 'src/domain/entities/user/user.entity'
import { Tasks } from 'src/domain/entities/task/task.entity'
import { TaskDetail } from 'src/domain/entities/task/task-detail/task-detail.entity'
import { TaskDetailAdditionalService } from 'src/domain/entities/task/task-detail/task-detail-additional-service.entity'
import { TaskDetailStepOne } from 'src/domain/entities/task/task-detail-step-one/task-detail-step-one.entity'
import { TaskDetailStepOneAdditionalService } from 'src/domain/entities/task/task-detail-step-one/task-detail-step-one-additional-service.entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_NAME', 'web_pms_db'),
        entities: [
          Users,
          Tasks,
          TaskDetail,
          TaskDetailAdditionalService,
          TaskDetailStepOne,
          TaskDetailStepOneAdditionalService,
        ],
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
