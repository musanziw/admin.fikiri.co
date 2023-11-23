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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("./entities/role.entity");
const typeorm_2 = require("typeorm");
let RolesService = class RolesService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async insertRoles() {
        await this.roleRepository.upsert([
            { id: 1, name: 'admin' },
            { id: 2, name: 'user' },
        ], { conflictPaths: ['id'] });
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Rôles ajoutés avec succès',
        };
    }
    async create(createRoleDto) {
        const { name } = createRoleDto;
        const role = await this.roleRepository.findOne({
            where: { name },
        });
        if (role)
            throw new common_1.HttpException('Le rôle existe déjà', common_1.HttpStatus.CONFLICT);
        await this.roleRepository.save(createRoleDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Rôle ajouté avec succès',
        };
    }
    async findAll() {
        const roles = await this.roleRepository.find();
        return {
            statusCode: common_1.HttpStatus.OK,
            data: roles,
        };
    }
    async findOne(id) {
        const role = await this.roleRepository.findOneBy({ id });
        if (!role)
            throw new common_1.HttpException("Le rôle n'a pas été trouvé", common_1.HttpStatus.NOT_FOUND);
        return {
            statusCode: common_1.HttpStatus.OK,
            data: role,
        };
    }
    async update(id, updateRoleDto) {
        const role = await this.roleRepository.findOneBy({ id });
        if (!role)
            throw new common_1.HttpException("Le rôle n'a pas été trouvé", common_1.HttpStatus.NOT_FOUND);
        await this.roleRepository.update(id, updateRoleDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Rôle mis à jour avec succès',
        };
    }
    async remove(id) {
        const role = await this.roleRepository.findOneBy({ id });
        if (!role)
            throw new common_1.HttpException("Le rôle n'a pas été trouvé", common_1.HttpStatus.NOT_FOUND);
        await this.roleRepository.delete(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Le rôle a été supprimé avec succès',
        };
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map