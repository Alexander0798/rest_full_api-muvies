import { IsNotEmpty } from "class-validator";

export class CreateMovieDto {
  @IsNotEmpty()
  readonly title: string;
  readonly description: string;
  readonly year: number;
}
