import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: "Le jeton est obligatoire"})
  reset_token: string;

  @IsNotEmpty({ message: "Le mot de passe est obligatoire"})
  password: string;
}
