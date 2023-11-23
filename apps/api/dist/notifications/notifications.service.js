"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
let NotificationsService = class NotificationsService {
    constructor(mailService, configService) {
        this.mailService = mailService;
        this.configService = configService;
    }
    async welcome({ payload }) {
        const { email, password } = payload;
        try {
            await this.mailService.sendMail({
                to: email,
                from: this.configService.get('MAIL_USERNAME'),
                subject: 'Bienvenue sur la plateforme SDG',
                template: 'welcome',
                context: {
                    email,
                    password,
                },
            });
        }
        catch {
            throw new common_1.HttpException('Mauvaise demande, essayez à nouveau', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async passwordReset({ payload }) {
        const { email, password } = payload;
        try {
            await this.mailService.sendMail({
                to: email,
                from: this.configService.get('MAIL_USERNAME'),
                subject: 'Réinitialisation du mot de passe',
                template: 'password-reset',
                context: {
                    email,
                    password,
                },
            });
        }
        catch {
            throw new common_1.HttpException('Mauvaise demande, essayez à nouveau', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.NotificationsService = NotificationsService;
__decorate([
    (0, event_emitter_1.OnEvent)('user.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsService.prototype, "welcome", null);
__decorate([
    (0, event_emitter_1.OnEvent)('password.reset'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsService.prototype, "passwordReset", null);
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map