import { ThematicsService } from './thematics.service';
import { CreateThematicDto } from './dto/create-thematic.dto';
import { UpdateThematicDto } from './dto/update-thematic.dto';
export declare class ThematicsController {
    private readonly thematicsService;
    constructor(thematicsService: ThematicsService);
    create(createThematicDto: CreateThematicDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    findAll(): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        data: import("./entities/thematic.entity").Thematic[];
    }>;
    findOne(id: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        data: import("./entities/thematic.entity").Thematic;
    }>;
    update(id: string, updateThematicDto: UpdateThematicDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    remove(id: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
