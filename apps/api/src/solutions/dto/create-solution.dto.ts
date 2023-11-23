import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateSolutionDto {
  @IsNotEmpty({
    message: 'Le nom est requis',
  })
  name: string;

  @IsNotEmpty({
    message: 'Ce champ ne peut pas être vide',
  })
  solved_problem: string;

  @IsNotEmpty({
    message: 'Ce champ ne peut pas être vide',
  })
  solution_description: string;

  @IsNotEmpty({
    message: 'Ce champ ne peut pas être vide',
  })
  steps: string;

  @IsNotEmpty({
    message: 'Ce champ ne peut pas être vide',
  })
  video_link: string;

  @IsArray({
    message: 'Veuillez chosir une thématique',
  })
  thematics: number[];

  @IsArray({
    message: 'Ce champ ne peut pas être vide',
  })
  expansion_project: string;
}
