import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SerializedUser } from '../types/serialized-user';
import { PasswordService } from './password.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
export declare class AuthController {
    private readonly authService;
    private readonly authPasswordService;
    constructor(authService: AuthService, authPasswordService: PasswordService);
    logout(request: Request): Promise<any>;
    profile(user: SerializedUser): Promise<any>;
    updateProfile(user: SerializedUser, updateProfileDto: UpdateProfileDto): Promise<any>;
    updatePassword(user: SerializedUser, updatePassword: UpdatePasswordDto): Promise<any>;
    login(user: SerializedUser): Promise<any>;
    resetPasswordRequest(resetPasswordDto: ResetPasswordRequestDto): Promise<any>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<any>;
    register(registerDto: RegisterDto): Promise<any>;
}
