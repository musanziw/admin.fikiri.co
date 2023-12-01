import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsService {
  constructor(
    private mailService: MailerService,
    private configService: ConfigService,
  ) { }


  @OnEvent('user.registered')
  async register({ payload }): Promise<void> {
    const { email, password } = payload;
    try {
      await this.mailService.sendMail({
        to: email,
        from: this.configService.get('MAIL_USERNAME'),
        subject: 'Bienvenue sur la plateforme SDG',
        template: 'welcome',
        context: {
          email,
          password,
        },
      });
    } catch {
      throw new HttpException('Mauvaise demande, essayez à nouveau', HttpStatus.BAD_REQUEST);
    }
  }

  @OnEvent('user.created')
  async welcome({ payload }): Promise<void> {
    const { email, password } = payload;
    try {
      await this.mailService.sendMail({
        to: email,
        from: this.configService.get('MAIL_USERNAME'),
        subject: 'Bienvenue sur la plateforme SDG',
        template: 'welcome',
        context: {
          email,
          password,
        },
      });
    } catch {
      throw new HttpException('Mauvaise demande, essayez à nouveau', HttpStatus.BAD_REQUEST);
    }
  }

  @OnEvent('password.reset')
  async passwordReset({ payload }): Promise<void> {
    const { email, password } = payload;
    try {
      await this.mailService.sendMail({
        to: email,
        from: this.configService.get('MAIL_USERNAME'),
        subject: 'Réinitialisation du mot de passe',
        template: 'password-reset',
        context: {
          email,
          password,
        },
      });
    } catch {
      throw new HttpException('Mauvaise demande, essayez à nouveau', HttpStatus.BAD_REQUEST);
    }
  }
}
