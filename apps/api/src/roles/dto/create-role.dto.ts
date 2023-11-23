import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Le rôle ne peut pas être vide' })
  name: string;
}
