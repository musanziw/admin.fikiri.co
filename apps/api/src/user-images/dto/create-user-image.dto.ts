import {IsNotEmpty} from "class-validator";

export class CreateUserImageDto {
    @IsNotEmpty({message: "L'image est obligatoire"})
    thumb: string;
}
