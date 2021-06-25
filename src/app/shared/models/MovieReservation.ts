import { User } from './User';
import { MovieScreening } from './MovieScreening';
import { AuditoriumSeat } from './AuditoriumSeat';

export interface MovieReservation {
  user: any;
  screening: MovieScreening;
  seat: AuditoriumSeat;
}
