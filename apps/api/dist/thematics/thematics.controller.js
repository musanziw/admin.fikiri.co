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
exports.ThematicsController = void 0;
const common_1 = require("@nestjs/common");
const thematics_service_1 = require("./thematics.service");
const create_thematic_dto_1 = require("./dto/create-thematic.dto");
const update_thematic_dto_1 = require("./dto/update-thematic.dto");
let ThematicsController = class ThematicsController {
    constructor(thematicsService) {
        this.thematicsService = thematicsService;
    }
    create(createThematicDto) {
        return this.thematicsService.create(createThematicDto);
    }
    findAll() {
        return this.thematicsService.findAll();
    }
    findOne(id) {
        return this.thematicsService.findOne(+id);
    }
    update(id, updateThematicDto) {
        return this.thematicsService.update(+id, updateThematicDto);
    }
    remove(id) {
        return this.thematicsService.remove(+id);
    }
};
exports.ThematicsController = ThematicsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_thematic_dto_1.CreateThematicDto]),
    __metadata("design:returntype", void 0)
], ThematicsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ThematicsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ThematicsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_thematic_dto_1.UpdateThematicDto]),
    __metadata("design:returntype", void 0)
], ThematicsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ThematicsController.prototype, "remove", null);
exports.ThematicsController = ThematicsController = __decorate([
    (0, common_1.Controller)('thematics'),
    __metadata("design:paramtypes", [thematics_service_1.ThematicsService])
], ThematicsController);
//# sourceMappingURL=thematics.controller.js.map