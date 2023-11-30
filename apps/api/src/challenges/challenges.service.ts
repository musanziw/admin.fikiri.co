import { PrismaService } from './../database/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChallengesService {
    constructor(
        private readonly prismaService: PrismaService
    ) {
    }



    async findAll() {
        const thematics = await this.prismaService.challenge.findMany();
        return {
            statusCode: HttpStatus.OK,
            data: thematics
        }
    }

    async findByThematic(thematicId: number) {
        const challenges = await this.prismaService.challenge.findMany({
            where: { id: thematicId }
        })
        return {
            statusCode: HttpStatus.OK,
            data: challenges
        }
    }

    async findOne(id: number) {
        const thematic = await this.prismaService.challenge.findUnique({
            where: { id }
        })
        if (!thematic) throw new HttpException("Le défi n'a pas été trouvé", HttpStatus.NOT_FOUND);
        return {
            statusCode: HttpStatus.OK,
            data: thematic,
        };
    }

}
