import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    insertRoles(): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    create(createRoleDto: CreateRoleDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<any>;
    remove(id: string): Promise<any>;
}
