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
import { Prisma } from "@prisma/client";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @Post()
    create(@Body() createUserDto: Prisma.UserCreateInput): Promise<any> {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll(): Promise<any> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<any> {
        return this.userService.findById(+id);
    }

    @Get('email/:email')
    findByMail(@Param('email') email: string) {
        this.userService.findByEmail(email)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserDto: Prisma.UserUpdateInput,
    ): Promise<any> {
        return this.userService.update(+id, updateUserDto);
    }


    @Delete(':id')
    remove(@Param('id') id: string): Promise<any> {
        return this.userService.remove(+id);
    }
}
