import {IsNotEmpty} from "class-validator";

export class CreateThematicDto {
    @IsNotEmpty({
        message: 'La thématique ne peut pas être vide'
    })
    name: string
}
