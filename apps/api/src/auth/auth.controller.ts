import { Body, Controller, Post } from '@nestjs/common';
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

    @Post('register')
    register(@Body() registerDto: Prisma.UserCreateInput): Promise<any> {
        return this.authService.register(registerDto);
    }
}
