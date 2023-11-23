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
exports.SolutionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const solution_entity_1 = require("./entities/solution.entity");
const typeorm_2 = require("typeorm");
let SolutionsService = class SolutionsService {
    constructor(solutionService) {
        this.solutionService = solutionService;
    }
    async create(createSolutionDto) {
        try {
            await this.solutionService.save({
                ...createSolutionDto,
                thematics: createSolutionDto.thematics.map((id) => ({ id })),
            });
        }
        catch {
            throw new common_1.HttpException('Mauvaise demande, essayez à nouveau', common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: "La solution a été ajouté avec succès",
        };
    }
    async findAll() {
        const solutions = await this.solutionService.find();
        return {
            statusCode: common_1.HttpStatus.OK,
            data: solutions
        };
    }
    async findOne(id) {
        const solution = await this.solutionService.findOne({
            where: { id },
            relations: ['thematics']
        });
        if (!solution)
            throw new common_1.HttpException("La solution n'a pas été trouvé", common_1.HttpStatus.NOT_FOUND);
        return {
            statusCode: common_1.HttpStatus.OK,
            data: solution,
        };
    }
    async update(id, updateSolutionDto) {
        const solution = await this.solutionService.findOneBy({ id });
        if (!solution)
            throw new common_1.HttpException("L'utilisateur n'a pas été trouvé", common_1.HttpStatus.NOT_FOUND);
        const updatedUser = Object.assign(solution, updateSolutionDto);
        try {
            await this.solutionService.save({
                ...updatedUser,
                thematics: updateSolutionDto.thematics.map((id) => ({ id })),
            });
        }
        catch {
            throw new common_1.HttpException('Thématiques non valides', common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Mise à jour de la solution réussie",
        };
    }
    async remove(id) {
        const solution = await this.solutionService.findOneBy({ id });
        if (!solution)
            throw new common_1.HttpException("La solution n'a pas été trouvé", common_1.HttpStatus.NOT_FOUND);
        await this.solutionService.delete(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "La solution est supprimé avec succès",
        };
    }
};
exports.SolutionsService = SolutionsService;
exports.SolutionsService = SolutionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(solution_entity_1.Solution)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SolutionsService);
//# sourceMappingURL=solutions.service.js.map