import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { SerializedUser } from '../types/serialized-user';
import { PasswordService } from './password.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly authPasswordService: PasswordService,
    ) {
    }

    @Get('logout')
    logout(@Req() request: Request): Promise<any> {
        return this.authService.logout(request);
    }

    @Get('profile')
    profile(@CurrentUser() user: SerializedUser) {
        return this.authService.profile(user);
    }

    @Patch('profile')
    updateProfile(
        @CurrentUser() user: SerializedUser,
        @Body() updateProfileDto: Prisma.UserUpdateInput,
    ) {
        return this.authService.updateProfile(user, updateProfileDto);
    }

    @Patch('update-password')
    updatePassword(@CurrentUser() user: SerializedUser, @Body('password') password: string) {
        return this.authPasswordService.updatePassword(user, password);
    }

    @Public()
    @UseGuards(LocalGuard)
    @Post('login')
    login(@CurrentUser() user: SerializedUser): Promise<any> {
        return this.authService.login(user);
    }

    @Public()
    @Post('reset-password-request')
    resetPasswordRequest(@Body('email') email: string) {
        return this.authPasswordService.resetPasswordRequest(email);
    }

    @Public()
    @Post('reset-password')
    resetPassword(@Body() resetPasswordDto: { token: string, email: string }): Promise<any> {
        return this.authPasswordService.resetPassword(resetPasswordDto.token, resetPasswordDto.email);
    }

    @Public()
    @Post('register')
    register(@Body() registerDto: Prisma.UserCreateInput): Promise<any> {
        return this.authService.register(registerDto);
    }
}
