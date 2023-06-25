import {
  Controller,
  HttpCode,
  HttpStatus,
  UseGuards,
  Header,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Movie } from './movie.schema';
import { CreateMovieDto } from './dto/createMovie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { MovieService } from './movie.service';
import { AuthGuard } from 'src/user/guard/auth.guard';

@Controller('movies')
export class MovieController {
  constructor(private readonly moviesService: MovieService) {}
  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async getMovies(): Promise<Movie[]> {
    return await this.moviesService.getMovies();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  getMoviesById(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.getMoviesById(id);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  updateMovie(
    @Body() updateMovieDto: UpdateMovieDto,
    @Param('id') id: string,
  ): Promise<Movie> {
    return this.moviesService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  removeMovie(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.removeMovie(id);
  }
}
