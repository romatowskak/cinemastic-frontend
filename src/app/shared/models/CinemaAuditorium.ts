import { AuditoriumSeat } from './AuditoriumSeat';

export interface CinemaAuditorium {
  seatNo: number;
  seats: AuditoriumSeat[];
}
