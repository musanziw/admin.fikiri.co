import { HttpStatus } from '@nestjs/common';
import { CreateThematicDto } from './dto/create-thematic.dto';
import { UpdateThematicDto } from './dto/update-thematic.dto';
import { Thematic } from "./entities/thematic.entity";
import { Repository } from "typeorm";
export declare class ThematicsService {
    private readonly thematicRepository;
    constructor(thematicRepository: Repository<Thematic>);
    create(createThematicDto: CreateThematicDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        data: Thematic[];
    }>;
    findOne(id: number): Promise<{
        statusCode: HttpStatus;
        data: Thematic;
    }>;
    update(id: number, updateThematicDto: UpdateThematicDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    remove(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
