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
exports.ThematicsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const thematic_entity_1 = require("./entities/thematic.entity");
const typeorm_2 = require("typeorm");
let ThematicsService = class ThematicsService {
    constructor(thematicRepository) {
        this.thematicRepository = thematicRepository;
    }
    async create(createThematicDto) {
        const { name } = createThematicDto;
        const thematic = await this.thematicRepository.findOne({
            where: { name },
        });
        if (thematic)
            throw new common_1.HttpException('La thématique existe déjà', common_1.HttpStatus.CONFLICT);
        await this.thematicRepository.save(createThematicDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'La thématique ajouté avec succès',
        };
    }
    async findAll() {
        const thematics = await this.thematicRepository.find();
        return {
            statusCode: common_1.HttpStatus.OK,
            data: thematics
        };
    }
    async findOne(id) {
        const thematic = await this.thematicRepository.findOneBy({ id });
        if (!thematic)
            throw new common_1.HttpException("La thématique n'a pas été trouvé", common_1.HttpStatus.NOT_FOUND);
        return {
            statusCode: common_1.HttpStatus.OK,
            data: thematic,
        };
    }
    async update(id, updateThematicDto) {
        const thematic = await this.thematicRepository.findOneBy({ id });
        if (!thematic)
            throw new common_1.HttpException("La thématique n'a pas été trouvé", common_1.HttpStatus.NOT_FOUND);
        await this.thematicRepository.update(id, updateThematicDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'La thématique est mis à jour avec succès',
        };
    }
    async remove(id) {
        const thematic = await this.thematicRepository.findOneBy({ id });
        if (!thematic)
            throw new common_1.HttpException("La thématique n'a pas été trouvé", common_1.HttpStatus.NOT_FOUND);
        await this.thematicRepository.delete(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'La thématique a été supprimé avec succès',
        };
    }
};
exports.ThematicsService = ThematicsService;
exports.ThematicsService = ThematicsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(thematic_entity_1.Thematic)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ThematicsService);
//# sourceMappingURL=thematics.service.js.map