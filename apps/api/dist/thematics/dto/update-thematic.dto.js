"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateThematicDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_thematic_dto_1 = require("./create-thematic.dto");
class UpdateThematicDto extends (0, mapped_types_1.PartialType)(create_thematic_dto_1.CreateThematicDto) {
}
exports.UpdateThematicDto = UpdateThematicDto;
//# sourceMappingURL=update-thematic.dto.js.map