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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
const random_password_1 = require("../helpers/random-password");
let UsersService = class UsersService {
    constructor(userRepository, eventEmitter) {
        this.userRepository = userRepository;
        this.eventEmitter = eventEmitter;
    }
    async create(createUserDto) {
        const { email } = createUserDto;
        const user = await this.findByEmail(email);
        if (user)
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.CONFLICT);
        try {
            const password = (0, random_password_1.randomPassword)();
            await this.userRepository.save({
                ...createUserDto,
                password,
                roles: createUserDto.roles.map((role) => ({ id: role })),
            });
            const payload = { email, password };
            this.eventEmitter.emit('user.created', { payload });
        }
        catch {
            throw new common_1.HttpException('Mauvaise demande, essayez à nouveau', common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: "L'utilisateur a été ajouté avec succès",
        };
    }
    async register(registerDto) {
        const user = await this.userRepository.findOneBy({
            email: registerDto.email,
        });
        if (user)
            throw new common_1.HttpException("L'utilisateur existe déjà", common_1.HttpStatus.CONFLICT);
        await this.userRepository.save({
            ...registerDto,
            roles: [{ id: 2 }],
        });
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: "L'inscription est réussie",
        };
    }
    async findAll() {
        const users = await this.userRepository.find({
            select: ['id', 'name', 'email', 'is_active', 'created_at'],
            relations: ['roles'],
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            data: users,
        };
    }
    async findById(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'is_active', 'created_at'],
        });
        if (!user)
            throw new common_1.HttpException("L'utilisateur n'a pas été trouvé", common_1.HttpStatus.NOT_FOUND);
        return {
            statusCode: common_1.HttpStatus.OK,
            data: user,
        };
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['roles'],
        });
        if (!user)
            throw new common_1.HttpException("L'utilisateur n'a pas été trouvé", common_1.HttpStatus.NOT_FOUND);
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.HttpException("L'utilisateur n'a pas été trouvé", common_1.HttpStatus.NOT_FOUND);
        const updatedUser = Object.assign(user, updateUserDto);
        try {
            await this.userRepository.save({
                ...updatedUser,
                roles: updateUserDto.roles.map((role) => ({ id: role })),
            });
        }
        catch {
            throw new common_1.HttpException('Rôles non valides', common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Mise à jour de l'utilisateur réussie",
        };
    }
    async updatePassword(user, password) {
        user.password = password;
        await this.userRepository.save(user);
    }
    async saveResetToken(user, password) {
        user.reset_token = password;
        await this.userRepository.save(user);
    }
    async remove(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.HttpException("L'utilisateur n'a pas été trouvé", common_1.HttpStatus.NOT_FOUND);
        await this.userRepository.delete(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "L'utilisateur est supprimé avec succès",
        };
    }
    async findByResetToken(reset_token) {
        const user = await this.userRepository.findOneBy({
            reset_token,
        });
        if (!user)
            throw new common_1.HttpException("L'utilisateur n'a pas été trouvé", common_1.HttpStatus.NOT_FOUND);
        return user;
    }
    async removeResetToken(user) {
        user.reset_token = null;
        await this.userRepository.save(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], UsersService);
//# sourceMappingURL=users.service.js.map