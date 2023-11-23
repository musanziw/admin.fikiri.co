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
exports.CreateSolutionDto = void 0;
const class_validator_1 = require("class-validator");
class CreateSolutionDto {
}
exports.CreateSolutionDto = CreateSolutionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Le nom est requis'
    }),
    __metadata("design:type", String)
], CreateSolutionDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Ce champ ne peut pas être vide'
    }),
    __metadata("design:type", String)
], CreateSolutionDto.prototype, "solved_problem", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Ce champ ne peut pas être vide'
    }),
    __metadata("design:type", String)
], CreateSolutionDto.prototype, "solution_description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Ce champ ne peut pas être vide'
    }),
    __metadata("design:type", String)
], CreateSolutionDto.prototype, "steps", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Ce champ ne peut pas être vide'
    }),
    __metadata("design:type", String)
], CreateSolutionDto.prototype, "video_link", void 0);
__decorate([
    (0, class_validator_1.IsArray)({
        message: 'Veuillez chosir une thématique'
    }),
    __metadata("design:type", Array)
], CreateSolutionDto.prototype, "thematics", void 0);
//# sourceMappingURL=create-solution.dto.js.map