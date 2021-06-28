import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CinemaAuditorium } from 'src/app/shared/models/CinemaAuditorium';
import { MovieReservation } from 'src/app/shared/models/MovieReservation';
import { MovieScreening } from 'src/app/shared/models/MovieScreening';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private httpClient: HttpClient) {}

  public getAuditorium(auditoriumId: number): Observable<CinemaAuditorium> {
    return this.httpClient.get<CinemaAuditorium>(`${environment.apiUrl}/auditoriums/${auditoriumId}`);
  }

  public getScreening(screeningId: number): Observable<MovieScreening> {
    return this.httpClient.get<MovieScreening>(`${environment.apiUrl}/screenings/${screeningId}`);
  }

  public getReservations(): Observable<MovieReservation[]> {
    return this.httpClient.get<MovieReservation[]>(`${environment.apiUrl}/reservations`);
  }

  public addReservation(reservation: MovieReservation): Observable<MovieReservation> {
    return this.httpClient.post<MovieReservation>(`${environment.apiUrl}/reservations`, reservation);
  }

  public removeReservation(reservationId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/reservations/${reservationId}`);
  }
}
