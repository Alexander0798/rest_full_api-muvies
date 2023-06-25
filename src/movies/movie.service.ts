import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { CreateMovieDto } from './dto/createMovie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieRepository: Model<MovieDocument>,
  ) {}

  async getMovies(): Promise<Movie[]> {
    return await this.movieRepository.find().exec();
  }
  async getMoviesById(id: string): Promise<Movie> {
    return await this.movieRepository.findById(id);
  }
  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title } = createMovieDto;
    const movieByTitle = await this.movieRepository.findOne({
      title: title,
    });
    if (movieByTitle) {
      throw new HttpException(
        'the film already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newMovie = new this.movieRepository(createMovieDto);
    return await newMovie.save();
  }
  async updateMovie(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return await this.movieRepository.findByIdAndUpdate(id, updateMovieDto);
  }
  async removeMovie(id: string): Promise<Movie> {
    return await this.movieRepository.findByIdAndRemove(id);
  }
}
