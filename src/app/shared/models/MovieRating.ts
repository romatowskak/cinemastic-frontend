import { Movie } from './Movie';

export interface MovieRating {
  id: number;
  user: number;
  value: number;
  movie: Movie;
}
