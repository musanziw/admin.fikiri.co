import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { CurrentUser } from './decorators/current-user.decorator';
import { SerializedUser } from '../types/serialized-user';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const passwordMatch: boolean = await this.passworMatch(
      password,
      user.password,
    );
    if (!passwordMatch)
      throw new HttpException("Informations d'identification invalides", HttpStatus.BAD_REQUEST);

    const payload = { sub: user.id, name: user.name, email: user.email };

    return {
      message: 'Connexion réussie',
      statusCode: HttpStatus.OK,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken: await this.jwtService.signAsync(payload),
      },
    };

  }

  async passworMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }


  async profile(@CurrentUser() currentUser: SerializedUser): Promise<any> {
    const user = await this.userService.findByEmail(currentUser.email);
    if (user) {
      return {
        statusCode: HttpStatus.OK,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Vous n\'êtes pas connecté',
    }

  }

  async updateProfile(
    @CurrentUser() user: SerializedUser,
    updateProfileDto: Prisma.UserUpdateInput,
  ): Promise<any> {
    const { id } = user;
    await this.userService.update(+id, updateProfileDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Profil mis à jour avec succès',
    };
  }

  register(registerDto: Prisma.UserCreateInput): Promise<any> {
    return this.userService.register(registerDto);
  }
}
