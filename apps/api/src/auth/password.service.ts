import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { SerializedUser } from '../types/serialized-user';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmailPayload } from '../types/email-payload';
import { randomPassword } from '../helpers/random-password';

@Injectable()
export class PasswordService {
  constructor(
    private readonly userService: UsersService,
    private readonly eventEmitter: EventEmitter2,
  ) { }

  async updatePassword(@CurrentUser() currentUser: SerializedUser, password: string) {
    const { email } = currentUser;
    const user = await this.userService.findByEmail(email);
    await this.userService.updatePassword(user, password);
    return {
      statusCode: HttpStatus.OK,
      message: 'Mot de passe mis à jour avec succès',
    };
  }

  async resetPasswordRequest(email: string) {
    const password: string = randomPassword();
    const user = await this.userService.findByEmail(email);
    await this.userService.saveResetToken(user, password);
    const payload: EmailPayload = { email, password };
    this.eventEmitter.emit('password.reset', { payload });
    return {
      statusCode: HttpStatus.OK,
      message: 'Numéro de jeton envoyé par e-mail',
    };
  }

  async resetPassword(token: string, password: string) {
    const user = await this.userService.findByResetToken(token);
    await this.userService.removeResetToken(user);
    await this.userService.updatePassword(user, password);
    return {
      statusCode: HttpStatus.OK,
      message: 'Le mot de passe a été modifié avec succès',
    };
  }
}
