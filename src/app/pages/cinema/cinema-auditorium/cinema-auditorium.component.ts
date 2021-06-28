import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/core/store/reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { addReservationRequest, getAuditoriumRequest, getScreeningRequest } from 'src/app/core/store/actions/movies.actions';
import { getAuditoriumSelector, getReservationsSelector, getScreeeningSelector } from '../../../core/store/reducers/movies.reducer';
import { getSignedInUserSelector } from 'src/app/core/store/reducers/auth.reducer';
import { getReservationsRequest } from '../../../core/store/actions/movies.actions';
import { SelectionModel } from '@angular/cdk/collections';
import { CinemaAuditorium } from '../../../shared/models/CinemaAuditorium';
import { AuditoriumSeat } from 'src/app/shared/models/AuditoriumSeat';
import { MovieScreening } from '../../../shared/models/MovieScreening';
import { MovieReservation } from '../../../shared/models/MovieReservation';
import { User } from 'src/app/shared/models/User';
import { arrangeSeatsInNumericalOrder } from 'src/app/shared/utils/helpers';

@Component({
  selector: 'app-cinema-auditorium',
  templateUrl: './cinema-auditorium.component.html',
  styleUrls: ['./cinema-auditorium.component.scss'],
})
export class CinemaAuditoriumComponent implements OnInit {
  screeningSeatSelection = new SelectionModel<number>(true);
  reservationSeatSelection = new SelectionModel<AuditoriumSeat>(true);
  auditorium: CinemaAuditorium;
  currentScreening: MovieScreening;
  user: User;

  constructor(private store: Store<State>, private currentRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const { auditoriumId, screeningId } = this.currentRoute.snapshot.params;

    this.store.dispatch(getAuditoriumRequest({ payload: { auditoriumId } }));
    this.store.dispatch(getReservationsRequest());
    this.store.dispatch(getScreeningRequest({ payload: { screeningId: +screeningId } }));

    this.store.select(getAuditoriumSelector).subscribe((auditorium: CinemaAuditorium) => {
      this.auditorium = auditorium && { ...auditorium, seats: arrangeSeatsInNumericalOrder(auditorium.seats) };
    });

    this.store.select(getReservationsSelector).subscribe((reservations: MovieReservation[]) => {
      const screeningReservedSeats = reservations.map(
        (reservation: MovieReservation) => reservation.screening.id === +screeningId && reservation.seat.id
      );
      this.screeningSeatSelection.select(...screeningReservedSeats);
    });

    this.store.select(getScreeeningSelector).subscribe((screening: MovieScreening) => {
      this.currentScreening = screening;
    });

    this.store.select(getSignedInUserSelector).subscribe((user: User) => {
      this.user = user;
    });
  }

  selectSeat(seat: AuditoriumSeat) {
    this.screeningSeatSelection.toggle(seat.id);
    this.reservationSeatSelection.toggle(seat);
  }

  bookTickets() {
    const selectedSeats = this.reservationSeatSelection.selected;
    selectedSeats.forEach((seat: AuditoriumSeat) => {
      const reservation = {
        user: this.user.user,
        screening: this.currentScreening,
        seat,
        movie: this.currentScreening.movie,
      };
      this.store.dispatch(addReservationRequest({ payload: { reservation } }));
    });
  }

  goToMovieDetails(movieId: number) {
    this.router.navigate(['/cinemastic/movies/', movieId]);
  }
}
