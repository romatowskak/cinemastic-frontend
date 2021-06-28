import { MovieScreening } from './MovieScreening';
import { AuditoriumSeat } from './AuditoriumSeat';
import { Movie } from './Movie';

export interface MovieReservation {
  user: any;
  screening: MovieScreening;
  seat: AuditoriumSeat;
  movie: Movie;
}
