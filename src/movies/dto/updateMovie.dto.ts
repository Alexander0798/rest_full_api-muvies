import { IsNotEmpty } from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  readonly title: string;
  readonly description: string;
  readonly year: number;
}
