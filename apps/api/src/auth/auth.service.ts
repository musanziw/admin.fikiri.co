import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { CurrentUser } from './decorators/current-user.decorator';
import { SerializedUser } from '../types/serialized-user';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const passwordMatch: boolean = await this.passworMatch(
      password,
      user.password,
    );
    if (!passwordMatch)
      throw new HttpException("Informations d'identification invalides", HttpStatus.BAD_REQUEST);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    } as SerializedUser;
  }

  async passworMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async login(@CurrentUser() user: SerializedUser): Promise<any> {
    return {
      message: 'Connexion réussie',
      statusCode: HttpStatus.OK,
      data: user
    };
  }

  async logout(@Req() request: Request): Promise<any> {
    request.session.destroy(() => { });
    return {
      message: 'Déconnexion réussie',
      statusCode: HttpStatus.OK,
    };
  }

  async profile(@CurrentUser() user: SerializedUser): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
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
