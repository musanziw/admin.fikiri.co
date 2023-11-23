import {Module} from '@nestjs/common';
import {ThematicsService} from './thematics.service';
import {ThematicsController} from './thematics.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Thematic} from "./entities/thematic.entity";

@Module({
    controllers: [ThematicsController],
    providers: [ThematicsService],
    imports: [TypeOrmModule.forFeature([Thematic])],
})
export class ThematicsModule {
}
