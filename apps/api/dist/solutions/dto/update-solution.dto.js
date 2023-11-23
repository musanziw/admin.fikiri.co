"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSolutionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_solution_dto_1 = require("./create-solution.dto");
class UpdateSolutionDto extends (0, mapped_types_1.PartialType)(create_solution_dto_1.CreateSolutionDto) {
}
exports.UpdateSolutionDto = UpdateSolutionDto;
//# sourceMappingURL=update-solution.dto.js.map