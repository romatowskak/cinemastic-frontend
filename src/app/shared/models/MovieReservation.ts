import { MovieScreening } from './MovieScreening';
import { AuditoriumSeat } from './AuditoriumSeat';
import { Movie } from './Movie';

export interface MovieReservation {
  user: {
    id: number;
    username: string;
    email: string;
    admin: boolean;
  };
  screening: MovieScreening;
  seat: AuditoriumSeat;
  movie: Movie;
}
