import { HttpStatus } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
export declare class RolesService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    insertRoles(): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    create(createRoleDto: CreateRoleDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<any>;
    remove(id: number): Promise<any>;
}
