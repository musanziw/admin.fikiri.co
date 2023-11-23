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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const update_profile_dto_1 = require("./dto/update-profile.dto");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        const passwordMatch = await this.passworMatch(password, user.password);
        if (!passwordMatch)
            throw new common_1.HttpException("Informations d'identification invalides", common_1.HttpStatus.BAD_REQUEST);
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles.map((role) => role.name),
        };
    }
    async passworMatch(password, hash) {
        return await bcrypt.compare(password, hash);
    }
    async login(user) {
        return {
            message: 'Connexion réussie',
            statusCode: common_1.HttpStatus.OK,
            data: user
        };
    }
    async logout(request) {
        request.session.destroy(() => { });
        return {
            message: 'Déconnexion réussie',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async profile(user) {
        return {
            statusCode: common_1.HttpStatus.OK,
            data: user,
        };
    }
    async updateProfile(user, updateProfileDto) {
        const { id } = user;
        await this.userService.update(+id, updateProfileDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Profil mis à jour avec succès',
        };
    }
    register(registerDto) {
        return this.userService.register(registerDto);
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "login", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "logout", null);
__decorate([
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "profile", null);
__decorate([
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "updateProfile", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map