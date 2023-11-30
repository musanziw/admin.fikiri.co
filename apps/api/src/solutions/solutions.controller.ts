import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { Prisma } from '@prisma/client';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) { }

  @Post()
  create(@Body() createSolutionDto: Prisma.SolutionCreateInput & { thematic: number, maturity: number, call: number, challenges: number[] }) {
    return this.solutionsService.create(createSolutionDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.solutionsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solutionsService.findOne(+id);
  }


  @Public()
  @Get('thematic/:id')
  findByThematic(@Param('id') id: string) {
    return this.solutionsService.findByThematic(+id);
  }

  @Public()
  @Get('challenge/:id')
  findByCall(@Param('id') id: string) {
    return this.solutionsService.findByCall(+id);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolutionDto: Prisma.SolutionUpdateInput) {
    return this.solutionsService.update(+id, updateSolutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solutionsService.remove(+id);
  }
}
