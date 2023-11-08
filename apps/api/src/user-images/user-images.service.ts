import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserImage} from "./entities/user-image.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserImagesService {
    constructor(
        @InjectRepository(UserImage)
        private readonly userImagesRepository: Repository<UserImage>,
    ) {
    }

}
