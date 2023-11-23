import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateThematicDto} from './dto/create-thematic.dto';
import {UpdateThematicDto} from './dto/update-thematic.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Thematic} from "./entities/thematic.entity";
import {Repository} from "typeorm";

@Injectable()
export class ThematicsService {
    constructor(
        @InjectRepository(Thematic)
        private readonly thematicRepository: Repository<Thematic>
    ) {
    }

    async create(createThematicDto: CreateThematicDto) {
        const {name} = createThematicDto;
        const thematic: Thematic | null = await this.thematicRepository.findOne({
            where: {name},
        });
        if (thematic)
            throw new HttpException('La thématique existe déjà', HttpStatus.CONFLICT);
        await this.thematicRepository.save(createThematicDto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'La thématique ajouté avec succès',
        };
    }

    async findAll() {
        const thematics: Thematic[] = await this.thematicRepository.find()
        return {
            statusCode: HttpStatus.OK,
            data: thematics
        }
    }

    async findOne(id: number) {
        const thematic: Thematic | null = await this.thematicRepository.findOneBy({id});
        if (!thematic) throw new HttpException("La thématique n'a pas été trouvé", HttpStatus.NOT_FOUND);
        return {
            statusCode: HttpStatus.OK,
            data: thematic,
        };
    }

    async update(id: number, updateThematicDto: UpdateThematicDto) {
        const thematic: Thematic | null = await this.thematicRepository.findOneBy({id});
        if (!thematic) throw new HttpException("La thématique n'a pas été trouvé", HttpStatus.NOT_FOUND);
        await this.thematicRepository.update(id, updateThematicDto);
        return {
            statusCode: HttpStatus.OK,
            message: 'La thématique est mis à jour avec succès',
        };
    }

    async remove(id: number) {
        const thematic: Thematic | null = await this.thematicRepository.findOneBy({id});
        if (!thematic) throw new HttpException("La thématique n'a pas été trouvé", HttpStatus.NOT_FOUND);
        await this.thematicRepository.delete(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'La thématique a été supprimé avec succès',
        };
    }
}
