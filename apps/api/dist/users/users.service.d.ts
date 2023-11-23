import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class UsersService {
    private readonly userRepository;
    private readonly eventEmitter;
    constructor(userRepository: Repository<User>, eventEmitter: EventEmitter2);
    create(createUserDto: CreateUserDto): Promise<any>;
    register(registerDto: RegisterDto): Promise<any>;
    findAll(): Promise<any>;
    findById(id: number): Promise<any>;
    findByEmail(email: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<any>;
    updatePassword(user: User, password: string): Promise<void>;
    saveResetToken(user: User, password: string): Promise<any>;
    remove(id: number): Promise<any>;
    findByResetToken(reset_token: string): Promise<User>;
    removeResetToken(user: User): Promise<void>;
}
