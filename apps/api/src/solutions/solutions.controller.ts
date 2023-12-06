import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {SolutionsService} from './solutions.service';
import {Prisma} from '@prisma/client';

@Controller('solutions')
export class SolutionsController {
    constructor(private readonly solutionsService: SolutionsService) {
    }

    @Post()
    create(@Body() createSolutionDto: Prisma.SolutionCreateInput & {
        thematic: number,
        call: number,
        challenges: number[],
        user: string
    }) {
        return this.solutionsService.create(createSolutionDto);
    }

    @Get('approved')
    findApproved() {
        return this.solutionsService.findApproved();
    }

    @Get()
    findAll(@Query('page') page: string) {
        return this.solutionsService.findAll(+page);
    }


    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.solutionsService.findOne(+id);
    }

    @Get('user/:email')
    findByUser(@Param('email') email: string) {
        return this.solutionsService.findbyUser(email);
    }

    @Get('challenge/:id')
    findByCall(@Param('id') id: string) {
        return this.solutionsService.findByCall(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSolutionDto: Prisma.SolutionUpdateInput & { status: number }) {
        return this.solutionsService.update(+id, updateSolutionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.solutionsService.remove(+id);
    }
}
