import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {RolesModule} from './roles/roles.module';
import {SolutionsModule} from './solutions/solutions.module';
import {ThematicsModule} from './thematics/thematics.module';
import {PrismaModule} from './database/prisma.module';
import {CallsModule} from './calls/calls.module';
import {ChallengesModule} from './challenges/challenges.module';
import {StatusModule} from './status/status.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        UsersModule,
        RolesModule,
        SolutionsModule,
        ThematicsModule,
        PrismaModule,
        CallsModule,
        ChallengesModule,
        StatusModule
    ],
})
export class AppModule {
}
