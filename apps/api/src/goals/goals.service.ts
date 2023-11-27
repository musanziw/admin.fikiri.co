import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GoalsService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async create(createGoalDto: Prisma.GoalCreateInput) {
    await this.prismaService.goal.create({
      data: createGoalDto
    })
    return {
      statusCode: HttpStatus.CREATED,
      message: "L'objectif a bien été ajouté"
    }
  }

  async findAll() {
    const goals = this.prismaService.goal.findMany({})
    return {
      statusCode: HttpStatus.OK,
      data: goals
    }
  }

  async findOne(id: number) {
    const goal = await this.prismaService.goal.findUnique({
      where: { id }
    })
    if (!goal) throw new NotFoundException("L'objectif n'existe pas")
    return {
      statusCode: HttpStatus.OK,
      data: goal
    }
  }

  async update(id: number, updateGoalDto: Prisma.GoalUpdateInput) {
    const goal = await this.prismaService.goal.findUnique({
      where: { id }
    })
    if (!goal) throw new NotFoundException("L'objectif n'existe pas")
    await this.prismaService.goal.update({
      data: updateGoalDto,
      where: { id }
    })
    return {
      statusCode: HttpStatus.OK,
      message: "L'objectif a été mis à jour"
    }
  }

  async remove(id: number) {
    const goal = await this.prismaService.goal.findUnique({
      where: { id }
    })
    if (!goal) throw new NotFoundException("L'objectif n'existe pas")
    await this.prismaService.goal.delete({
      where: { id }
    })
    return {
      statusCode: HttpStatus.OK,
      message: "L'objectif a été supprimé"
    }
  }
}
