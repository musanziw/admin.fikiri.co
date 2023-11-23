import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
export declare class SolutionsController {
    private readonly solutionsService;
    constructor(solutionsService: SolutionsService);
    create(createSolutionDto: CreateSolutionDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    findAll(): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        data: import("./entities/solution.entity").Solution[];
    }>;
    findOne(id: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        data: import("./entities/solution.entity").Solution;
    }>;
    update(id: string, updateSolutionDto: UpdateSolutionDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    remove(id: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
