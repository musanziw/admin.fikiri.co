import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseRoles } from 'nest-access-control';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseRoles({
    resource: 'users',
    action: 'create',
    possession: 'any',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.create(createUserDto);
  }

  @UseRoles({
    resource: 'users',
    action: 'read',
    possession: 'any',
  })
  @Get()
  findAll(): Promise<any> {
    return this.userService.findAll();
  }

  @UseRoles({
    resource: 'users',
    action: 'read',
    possession: 'any',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.userService.findById(+id);
  }

  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'any',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return this.userService.update(+id, updateUserDto);
  }

  @UseRoles({
    resource: 'users',
    action: 'delete',
    possession: 'any',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.userService.remove(+id);
  }
}
