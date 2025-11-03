import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { Users } from '../domain/entities/user/user.entity'
import { UserRepository } from '../infrastructure/repositories/user.repository'
import { LoginUseCase } from './use-cases/login.use-case'
import { RegisterUseCase } from './use-cases/register.use-case'
import { UpdatePasswordUseCase } from './use-cases/update-password.use-case'
import { BcryptPasswordHasher } from '../infrastructure/services/password-hasher.service'
import { JwtTokenService } from '../infrastructure/services/jwt-token.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // Use Cases
    LoginUseCase,
    RegisterUseCase,
    UpdatePasswordUseCase,
    // Repository
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    // Infrastructure Services
    {
      provide: 'IPasswordHasher',
      useClass: BcryptPasswordHasher,
    },
    {
      provide: 'IJwtTokenService',
      useClass: JwtTokenService,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
