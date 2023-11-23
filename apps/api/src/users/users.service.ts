import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {RegisterDto} from '../auth/dto/register.dto';
import {EventEmitter2} from '@nestjs/event-emitter';
import {randomPassword} from '../helpers/random-password';
import {EmailPayload} from '../types/email-payload';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly eventEmitter: EventEmitter2,
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<any> {
        const {email} = createUserDto;
        const user: User = await this.findByEmail(email);
        if (user)
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        try {
            const password: string = randomPassword();
            await this.userRepository.save({
                ...createUserDto,
                password,
                roles: createUserDto.roles.map((role) => ({id: role})),
            });
            const payload: EmailPayload = {email, password};
            this.eventEmitter.emit('user.created', {payload});
        } catch {
            throw new HttpException('Mauvaise demande, essayez à nouveau', HttpStatus.BAD_REQUEST);
        }
        return {
            statusCode: HttpStatus.CREATED,
            message: "L'utilisateur a été ajouté avec succès",
        };
    }

    async register(registerDto: RegisterDto): Promise<any> {
        const user = await this.userRepository.findOneBy({
            email: registerDto.email,
        });
        if (user)
            throw new HttpException("L'utilisateur existe déjà", HttpStatus.CONFLICT);
        await this.userRepository.save({
            ...registerDto,
            roles: [{id: 2}],
        });
        return {
            statusCode: HttpStatus.CREATED,
            message: "L'inscription est réussie",
        };
    }

    async findAll(): Promise<any> {
        const users: User[] = await this.userRepository.find({
            select: ['id', 'name', 'email', 'is_active', 'created_at'],
            relations: ['roles'],
        });
        return {
            statusCode: HttpStatus.OK,
            data: users,
        };
    }

    async findById(id: number): Promise<any> {
        const user: User | null = await this.userRepository.findOne({
            where: {id},
            select: ['id', 'name', 'email', 'is_active', 'created_at'],
        });
        if (!user) throw new HttpException("L'utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
        return {
            statusCode: HttpStatus.OK,
            data: user,
        };
    }

    async findByEmail(email: string): Promise<User> {
        const user: User | null = await this.userRepository.findOne({
            where: {email},
            relations: ['roles'],
        });
        if (!user) throw new HttpException("L'utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
        const user: User | null = await this.userRepository.findOneBy({id});
        if (!user) throw new HttpException("L'utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
        const updatedUser = Object.assign(user, updateUserDto);
        try {
            await this.userRepository.save({
                ...updatedUser,
                roles: updateUserDto.roles.map((role: number) => ({id: role})),
            });
        } catch {
            throw new HttpException('Rôles non valides', HttpStatus.BAD_REQUEST);
        }
        return {
            statusCode: HttpStatus.OK,
            message: "Mise à jour de l'utilisateur réussie",
        };
    }

    async updatePassword(user: User, password: string): Promise<void> {
        user.password = password;
        await this.userRepository.save(user);
    }

    async saveResetToken(user: User, password: string): Promise<any> {
        user.reset_token = password;
        await this.userRepository.save(user);
    }

    async remove(id: number): Promise<any> {
        const user: User | null = await this.userRepository.findOneBy({id});
        if (!user) throw new HttpException("L'utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
        await this.userRepository.delete(id);
        return {
            statusCode: HttpStatus.OK,
            message: "L'utilisateur est supprimé avec succès",
        };
    }

    async findByResetToken(reset_token: string) {
        const user: User | null = await this.userRepository.findOneBy({
            reset_token,
        });
        if (!user) throw new HttpException("L'utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
        return user;
    }

    async removeResetToken(user: User) {
        user.reset_token = null;
        await this.userRepository.save(user);
    }
}
