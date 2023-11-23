import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SerializedUser } from '../types/serialized-user';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UsersService);
    validateUser(email: string, password: string): Promise<any>;
    passworMatch(password: string, hash: string): Promise<boolean>;
    login(user: SerializedUser): Promise<any>;
    logout(request: Request): Promise<any>;
    profile(user: SerializedUser): Promise<any>;
    updateProfile(user: any, updateProfileDto: UpdateProfileDto): Promise<any>;
    register(registerDto: RegisterDto): Promise<any>;
}
