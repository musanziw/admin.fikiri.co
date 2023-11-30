import { MaturitiesService } from './maturities.service';
import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';

@Public()
@Controller('maturities')
export class MaturitiesController {
  constructor(private readonly maturitiesService: MaturitiesService) { }

  @Get()
  findAll() {
    return this.maturitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maturitiesService.findOne(+id);
  }

}
