import { CinemaAuditorium } from './CinemaAuditorium';
import { Movie } from './Movie';

export interface MovieScreening {
  id: number;
  movie: Movie;
  auditorium: CinemaAuditorium;
  day: string;
  time: string;
}
