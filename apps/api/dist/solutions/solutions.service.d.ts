import { HttpStatus } from '@nestjs/common';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { Solution } from "./entities/solution.entity";
import { Repository } from "typeorm";
export declare class SolutionsService {
    private solutionService;
    constructor(solutionService: Repository<Solution>);
    create(createSolutionDto: CreateSolutionDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        data: Solution[];
    }>;
    findOne(id: number): Promise<{
        statusCode: HttpStatus;
        data: Solution;
    }>;
    update(id: number, updateSolutionDto: UpdateSolutionDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    remove(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
