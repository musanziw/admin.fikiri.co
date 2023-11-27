import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { RolesModule } from './roles/roles.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { AccessControlModule, ACGuard } from 'nest-access-control';
import { RBAC_POLICY } from './auth/rbac.policy';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from './notifications/notifications.module';
import { SolutionsModule } from './solutions/solutions.module';
import { ThematicsModule } from './thematics/thematics.module';
import { PrismaModule } from './database/prisma.module';
import { CallsModule } from './calls/calls.module';
import { GoalsModule } from './goals/goals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get('MAIL_USERNAME'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    EventEmitterModule.forRoot(),
    AccessControlModule.forRoles(RBAC_POLICY),
    NotificationsModule,
    SolutionsModule,
    ThematicsModule,
    PrismaModule,
    CallsModule,
    GoalsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ACGuard,
    },
  ],
})
export class AppModule { }
