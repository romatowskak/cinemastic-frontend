import { Auditorium } from './Auditorium';
import { Movie } from './Movie';

export interface Screening {
  id: number;
  movie: Movie;
  auditorium: Auditorium;
  day: string;
  time: number;
}
