import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateSolutionDto {
  @IsNotEmpty({
    message: 'Le nom est requis',
  })
  name: string;

  @IsNotEmpty({
    message: 'la solution ne peut pas être vide',
  })
  solved_problem: string;

  @IsNotEmpty({
    message: 'La secription de la solution ne peut pas être vide',
  })
  solution_description: string;

  @IsNotEmpty({
    message: 'Le champ etape ne peut pas être vide',
  })
  steps: string;

  @IsNotEmpty({
    message: 'Le lien est requis',
  })
  video_link: string;

  @IsArray({
    message: 'Selectionner une thématique',
  })
  thematics: number[];

  @IsNotEmpty({
    message: "L'expansion du projet est requis",
  })
  expansion_project: string;
}
