import {Module} from '@nestjs/common';
import {UserImagesService} from './user-images.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserImage} from "./entities/user-image.entity";

@Module({
    controllers: [],
    imports: [TypeOrmModule.forFeature([UserImage])],
    providers: [UserImagesService],
})
export class UserImagesModule {
}
