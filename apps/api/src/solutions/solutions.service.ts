import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solution } from './entities/solution.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(Solution)
    private solutionService: Repository<Solution>,
  ) {}

  async create(createSolutionDto: CreateSolutionDto) {
    try {
      await this.solutionService.save({
        ...createSolutionDto,
        thematics: createSolutionDto.thematics.map((id) => ({ id })),
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
    const solutions: Solution[] = await this.solutionService.find();
    return {
      statusCode: HttpStatus.OK,
      data: solutions,
    };
  }

  async findOne(id: number) {
    const solution: Solution | null = await this.solutionService.findOne({
      where: { id },
      relations: ['thematics'],
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

  async update(id: number, updateSolutionDto: UpdateSolutionDto) {
    const solution: Solution | null = await this.solutionService.findOneBy({
      id,
    });
    if (!solution)
      throw new HttpException(
        "L'utilisateur n'a pas été trouvé",
        HttpStatus.NOT_FOUND,
      );
    const updatedUser = Object.assign(solution, updateSolutionDto);
    try {
      await this.solutionService.save({
        ...updatedUser,
        thematics: updateSolutionDto.thematics.map((id: number) => ({ id })),
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
    const solution: Solution | null = await this.solutionService.findOneBy({
      id,
    });
    if (!solution)
      throw new HttpException(
        "La solution n'a pas été trouvé",
        HttpStatus.NOT_FOUND,
      );
    await this.solutionService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'La solution est supprimé avec succès',
    };
  }
}
