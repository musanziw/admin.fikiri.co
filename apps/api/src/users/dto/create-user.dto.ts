import {IsArray, IsEmail, IsOptional, IsString} from 'class-validator';

export class CreateUserDto {
    @IsString({message: 'Le nom ne peut pas être vide'})
    name: string;

    @IsEmail({}, {message: "L'email ne peut pas être vide"})
    email: string;

    @IsString({message: 'Le numéro de téléphone ne peut pas être vide'})
    phone: string;

    @IsString({message: "L'adresse ne peut pas être vide"})
    address: string;

    @IsOptional()
    is_active: boolean;

    @IsArray({message: 'Les rôles ne peuvent pas être vide'})
    roles: number[];
}
