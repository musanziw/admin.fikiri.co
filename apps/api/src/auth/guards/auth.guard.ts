import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC } from '../decorators/public.decorator';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async canActivate(context: ExecutionContext) {
    const isPublic =
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
        context.getHandler(),
        context.getClass(),
      ]) || false;
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new ForbiddenException({
        message: 'Veuillez vous connecter',
        statusCode: HttpStatus.FORBIDDEN,
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token, { secret: this.configService.get('JWT_SECRET') }
      );
      request['user'] = payload;
    } catch {
      throw new ForbiddenException({
        message: 'Veuillez vous connecter',
        statusCode: HttpStatus.FORBIDDEN,
      });
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
