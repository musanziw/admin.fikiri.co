import { Module } from '@nestjs/common';
import { MaturitiesController } from './maturities.controller';
import { MaturitiesService } from './maturities.service';

@Module({
    controllers: [MaturitiesController],
    providers: [MaturitiesService],
})

export class MaturitiesModule {
}
