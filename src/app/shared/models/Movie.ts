import { MovieRating } from './MovieRating';
import { MovieGenre } from 'src/app/shared/enums/MovieGenre';
import { MovieLanguage } from 'src/app/shared/enums/MovieLanguage';
import { MoviePhoto } from './MoviePhoto';
import { MovieActor } from './MovieActor';

export interface Movie {
  id: number;
  title: string;
  genre: MovieGenre;
  production: string;
  director: string;
  duration: number;
  adult: boolean;
  originalLanguage: MovieLanguage;
  subtitles: string;
  releaseDate: string;
  ratings: MovieRating[];
  overview: string;
  coverPhoto: MoviePhoto;
  trailer: string;
  gallery: MoviePhoto[];
  actors: MovieActor[];
}
