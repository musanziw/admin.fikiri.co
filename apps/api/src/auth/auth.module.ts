import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { PasswordService } from './password.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    NotificationsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
})
export class AuthModule { }
