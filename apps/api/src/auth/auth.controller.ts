import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    loginWithCredentials(@Body() signinDto: { email: string, password: string }): Promise<any> {
        return this.authService.login(signinDto.email, signinDto.password);
    }

    @Get('profile/:email')
    profile(@Param('email') email: string): Promise<any> {
        return this.authService.profile(email);
    }

    @Post('register')
    register(@Body() registerDto: Prisma.UserCreateInput): Promise<any> {
        return this.authService.register(registerDto);
    }
}
