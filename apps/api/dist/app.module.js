"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const mailer_1 = require("@nestjs-modules/mailer");
const roles_module_1 = require("./roles/roles.module");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./auth/guards/auth.guard");
const nest_access_control_1 = require("nest-access-control");
const rbac_policy_1 = require("./auth/rbac.policy");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const event_emitter_1 = require("@nestjs/event-emitter");
const notifications_module_1 = require("./notifications/notifications.module");
const solutions_module_1 = require("./solutions/solutions.module");
const thematics_module_1 = require("./thematics/thematics.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [],
                    synchronize: true,
                    autoLoadEntities: true,
                }),
            }),
            mailer_1.MailerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
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
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            event_emitter_1.EventEmitterModule.forRoot(),
            nest_access_control_1.AccessControlModule.forRoles(rbac_policy_1.RBAC_POLICY),
            notifications_module_1.NotificationsModule,
            solutions_module_1.SolutionsModule,
            thematics_module_1.ThematicsModule
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: nest_access_control_1.ACGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map