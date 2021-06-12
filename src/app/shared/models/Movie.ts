import { MovieRating } from './MovieRating';
import { MovieGenre } from 'src/app/shared/enums/MovieGenre';
import { MovieLanguage } from 'src/app/shared/enums/MovieLanguage';
import { MovieActor } from './MovieActor';
import { MoviePhoto } from './MoviePhoto';

export interface Movie {
  id: number;
  title: string;
  genre: MovieGenre;
  production: string;
  directior: string;
  duration: number;
  adult: boolean;
  original_language: MovieLanguage;
  subtitles: string[];
  release_date: string;
  ratings: MovieRating[];
  overview: string;
  cover_photo: MoviePhoto;
  trailer: string;
  gallery: MoviePhoto[];
  actors: MovieActor[];
}
