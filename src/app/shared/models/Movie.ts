import { MovieGenre } from 'src/app/shared/enums/MovieGenre';
import { MoviePhoto } from './MoviePhoto';
import { Screening } from 'src/app/shared/models/Screening';
import { MovieRating } from './MovieRating';

export interface Movie {
  id: number;
  title: string;
  genre: MovieGenre;
  production: string;
  director: string;
  duration: number;
  adult: boolean;
  originalLanguage: string;
  subtitles: string;
  releaseDate: string;
  ratings: MovieRating[];
  overview: string;
  coverPhoto: MoviePhoto;
  trailer: string;
  gallery: MoviePhoto[];
  screenings: Screening[];
}
