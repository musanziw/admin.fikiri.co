import { MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @MinLength(6, {
    message: 'Le champ de confirmation du mot de passe doit comporter au moins 6 caractères.',
  })
  @MaxLength(20, {
    message: 'Le champ de confirmation du mot de passe doit comporter moins de 20 caractères.',
  })
  password: string;
}
