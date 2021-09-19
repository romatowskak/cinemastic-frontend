import { Movie } from './Movie';
import { Screening } from './Screening';

export interface Reservation {
  user: {
    id: number;
    username: string;
    email: string;
    admin: boolean;
  };
  screening: Screening;
  seat: string;
  movie: Movie;
}
