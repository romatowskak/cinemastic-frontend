import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auditorium } from 'src/app/shared/models/Auditorium';
import { Reservation } from 'src/app/shared/models/Reservation';
import { Screening } from 'src/app/shared/models/Screening';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private httpClient: HttpClient) {}

  public getAuditorium(auditoriumId: number): Observable<Auditorium> {
    return this.httpClient.get<Auditorium>(`${environment.apiUrl}/auditoriums/${auditoriumId}`);
  }

  public getScreening(screeningId: number): Observable<Screening> {
    return this.httpClient.get<Screening>(`${environment.apiUrl}/screenings/${screeningId}`);
  }

  public getReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(`${environment.apiUrl}/reservations`);
  }

  public addReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(`${environment.apiUrl}/reservations`, reservation);
  }

  public removeReservation(reservationId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/reservations/${reservationId}`);
  }
}
