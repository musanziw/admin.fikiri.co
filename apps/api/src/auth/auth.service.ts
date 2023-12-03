import { BadRequestException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
  ) { }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const passwordMatch: boolean = await this.passworMatch(
      password,
      user.password,
    );
    if (!passwordMatch) throw new BadRequestException('Iidentifiants invalides');

    return {
      message: 'Connexion réussie',
      statusCode: HttpStatus.OK,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }


  async loginWithGoogle(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    // if (!passwordMatch)
    //   return {
    //     statusCode: HttpStatus.NOT_FOUND,
    //     message: "Informations d'identification invalides",
    //   }

    return {
      message: 'Connexion réussie',
      statusCode: HttpStatus.OK,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async passworMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  register(registerDto: Prisma.UserCreateInput): Promise<any> {
    return this.userService.register(registerDto);
  }
}
