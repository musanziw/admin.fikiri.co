import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;
    const role: Role | null = await this.roleRepository.findOne({
      where: { name },
    });
    if (role)
      throw new HttpException('Role already exists', HttpStatus.CONFLICT);
    await this.roleRepository.save(createRoleDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Role added successfully',
    };
  }

  async findAll(): Promise<any> {
    const roles: Role[] = await this.roleRepository.find();
    return {
      statusCode: HttpStatus.OK,
      data: roles,
    };
  }

  async findOne(id: number): Promise<any> {
    const role: Role | null = await this.roleRepository.findOneBy({ id });
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    return {
      statusCode: HttpStatus.OK,
      data: role,
    };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<any> {
    const role: Role | null = await this.roleRepository.findOneBy({ id });
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    await this.roleRepository.update(id, updateRoleDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Role updated successfully',
    };
  }

  async remove(id: number): Promise<any> {
    const role: Role | null = await this.roleRepository.findOneBy({ id });
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    await this.roleRepository.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Role deleted successfully',
    };
  }
}
