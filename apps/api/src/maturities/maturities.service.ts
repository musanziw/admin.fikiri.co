import { PrismaService } from './../database/prisma.service';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MaturitiesService {
    constructor(
        private readonly prismaService: PrismaService
    ) {
    }

    async findAll() {
        const thematics = await this.prismaService.maturity.findMany();
        return {
            statusCode: HttpStatus.OK,
            data: thematics
        }
    }

    async findByThematic(thematicId: number) {
        const challenges = await this.prismaService.maturity.findMany({
            where: { id: thematicId }
        })
        return {
            statusCode: HttpStatus.OK,
            data: challenges
        }
    }

    async findOne(id: number) {
        const thematic = await this.prismaService.maturity.findUnique({
            where: { id }
        })
        if (!thematic) throw new NotFoundException();
        return {
            statusCode: HttpStatus.OK,
            data: thematic,
        };
    }

}
