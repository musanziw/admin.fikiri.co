import { Controller, Get, Param } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Public()
@Controller('challenges')
export class ChallengesController {
  constructor(private readonly ChallengesService: ChallengesService) { }

  @Get()
  findAll() {
    return this.ChallengesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ChallengesService.findOne(+id);
  }

}
