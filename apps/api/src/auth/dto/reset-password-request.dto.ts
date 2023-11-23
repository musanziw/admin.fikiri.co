import {IsEmail} from 'class-validator';

export class ResetPasswordRequestDto {
    @IsEmail({}, {message: "L'email est invalide"})
    email: string;
}
