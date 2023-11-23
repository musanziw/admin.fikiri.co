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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const update_password_dto_1 = require("./dto/update-password.dto");
const event_emitter_1 = require("@nestjs/event-emitter");
const random_password_1 = require("../helpers/random-password");
let PasswordService = class PasswordService {
    constructor(userService, eventEmitter) {
        this.userService = userService;
        this.eventEmitter = eventEmitter;
    }
    async updatePassword(currentUser, updatePasswordDto) {
        const { email } = currentUser;
        const user = await this.userService.findByEmail(email);
        const { password } = updatePasswordDto;
        await this.userService.updatePassword(user, password);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Mot de passe mis à jour avec succès',
        };
    }
    async resetPasswordRequest(resetPasswordRequestDto) {
        const { email } = resetPasswordRequestDto;
        const password = (0, random_password_1.randomPassword)();
        const user = await this.userService.findByEmail(email);
        await this.userService.saveResetToken(user, password);
        const payload = { email, password };
        this.eventEmitter.emit('password.reset', { payload });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Numéro de jeton envoyé par e-mail',
        };
    }
    async resetPassword(resetPasswordDto) {
        const { reset_token, password } = resetPasswordDto;
        const user = await this.userService.findByResetToken(reset_token);
        await this.userService.removeResetToken(user);
        await this.userService.updatePassword(user, password);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Le mot de passe a été modifié avec succès',
        };
    }
};
exports.PasswordService = PasswordService;
__decorate([
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], PasswordService.prototype, "updatePassword", null);
exports.PasswordService = PasswordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        event_emitter_1.EventEmitter2])
], PasswordService);
//# sourceMappingURL=password.service.js.map