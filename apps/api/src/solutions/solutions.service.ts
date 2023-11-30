import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from "../database/prisma.service";
import { Prisma } from '@prisma/client';

@Injectable()
export class SolutionsService {
    constructor(
        private prismaService: PrismaService,
    ) {
    }

    async create(createSolutionDto: Prisma.SolutionCreateInput & { thematic: number, call: number, maturity: number, challenges: number[] }) {
        try {
            await this.prismaService.solution.create({
                data: {
                    ...createSolutionDto,
                    thematic: {
                        connect: {
                            id: createSolutionDto.thematic
                        }
                    },
                    call: {
                        connect: {
                            id: createSolutionDto.call
                        }
                    },
                    status: {
                        connect: {
                            id: 1
                        }
                    },
                    maturity: {
                        connect: {
                            id: createSolutionDto.maturity
                        }
                    },
                    challenges: {
                        connect: createSolutionDto.challenges.map((id) => ({ id }))
                    }
                },
            });
        } catch {
            throw new HttpException(
                'Mauvaise demande, essayez à nouveau',
                HttpStatus.BAD_REQUEST,
            );
        }
        return {
            statusCode: HttpStatus.CREATED,
            message: 'La solution a été ajouté avec succès',
        };
    }

    async findAll() {
        const solutions = await this.prismaService.solution.findMany({
            include: {
                thematic: true,
            }
        })
        return {
            statusCode: HttpStatus.OK,
            data: solutions,
        };
    }

    async findOne(id: number) {
        const solution = await this.prismaService.solution.findUnique({
            where: { id },
            include: {
                thematic: true,
            }
        });
        if (!solution)
            throw new HttpException(
                "La solution n'a pas été trouvé",
                HttpStatus.NOT_FOUND,
            );
        return {
            statusCode: HttpStatus.OK,
            data: solution,
        };
    }

    async findByThematic(thematicId: number) {
        const solutions = await this.prismaService.solution.findMany({
            where: { thematicId },
            include: {
                thematic: true,
            }
        })
        return {
            statusCode: HttpStatus.OK,
            data: solutions
        }
    }

    async findByCall(callId: number) {
        const solutions = await this.prismaService.solution.findMany({
            where: { callId },
            include: {
                thematic: true,
            }
        })
        return {
            statusCode: HttpStatus.OK,
            data: solutions
        }
    }

    async update(id: number, updateSolutionDto: Prisma.SolutionUpdateInput) {
        const solution = await this.prismaService.solution.findUnique({
            where: { id }
        });
        if (!solution)
            throw new HttpException(
                "La solution n'a pas été trouvé",
                HttpStatus.NOT_FOUND,
            );
        const updatedUser: Prisma.SolutionUpdateInput = Object.assign(solution, updateSolutionDto);
        try {
            await this.prismaService.solution.update({
                data: {
                    ...updatedUser
                },
                where: { id }
            });
        } catch {
            throw new HttpException(
                'Thématiques non valides',
                HttpStatus.BAD_REQUEST,
            );
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Mise à jour de la solution réussie',
        };
    }

    async remove(id: number) {
        const solution = await this.prismaService.solution.findUnique({
            where: { id }
        });
        if (!solution)
            throw new HttpException(
                "La solution n'a pas été trouvé",
                HttpStatus.NOT_FOUND,
            );
        await this.prismaService.solution.delete({
            where: { id }
        });
        return {
            statusCode: HttpStatus.OK,
            message: 'La solution est supprimé avec succès',
        };
    }
}
