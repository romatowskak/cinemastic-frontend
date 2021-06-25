import { CinemaAuditorium } from './CinemaAuditorium';

export interface AuditoriumSeat {
  id: number;
  auditorium: number;
  created_at: string;
  published_at: string;
  seatNumber: number;
  updated_at: string;
}
