import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/core/store/reducers';
import { ActivatedRoute } from '@angular/router';
import { getSignedInUserSelector } from 'src/app/core/store/reducers/auth.reducer';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from 'src/app/shared/models/User';
import { Subscription } from 'rxjs';
import { getAuditoriumSelector, getReservationsSelector, getScreeeningSelector } from 'src/app/core/store/reducers/booking.reducer';
import { addReservationRequest } from 'src/app/core/store/actions/booking.actions';
import { Auditorium } from 'src/app/shared/models/Auditorium';
import { Reservation } from 'src/app/shared/models/Reservation';
import { Screening } from 'src/app/shared/models/Screening';
import { AuditoriumRow } from 'src/app/shared/constants/AuditoriumRow';
import { Location } from '@angular/common';

@Component({
  selector: 'app-auditorium',
  templateUrl: './auditorium.component.html',
  styleUrls: ['./auditorium.component.scss'],
})
export class AuditoriumComponent implements OnInit, OnDestroy {
  screeningSeatSelection = new SelectionModel<string>(true);
  reservationSeatSelection = new SelectionModel<string>(true);
  auditoriumSubscription: Subscription;
  reservationsSubscription: Subscription;
  screeningSubscription: Subscription;
  auditorium: Auditorium;
  currentScreening: Screening;
  userSubscription: Subscription;
  user: User;
  readonly auditoriumRow = AuditoriumRow;

  constructor(private store: Store<State>, private currentRoute: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    const { screeningId } = this.currentRoute.snapshot.params;

    this.auditoriumSubscription = this.store.select(getAuditoriumSelector).subscribe((auditorium: Auditorium) => {
      this.auditorium = auditorium;
    });

    this.reservationsSubscription = this.store.select(getReservationsSelector).subscribe((reservations: Reservation[]) => {
      const screeningReservedSeats = reservations.map(
        (reservation: Reservation) => reservation.screening.id === +screeningId && reservation.seat
      );
      this.screeningSeatSelection.select(...screeningReservedSeats);
    });

    this.screeningSubscription = this.store.select(getScreeeningSelector).subscribe((screening: Screening) => {
      this.currentScreening = screening;
    });

    this.userSubscription = this.store.select(getSignedInUserSelector).subscribe((user: User) => {
      this.user = user;
    });
  }

  selectSeat(seat: number, index: number) {
    this.screeningSeatSelection.toggle(`${seat}${AuditoriumRow[index]}`);
    this.reservationSeatSelection.toggle(`${seat}${AuditoriumRow[index]}`);
  }

  isSeatSelected(seat: number, row: number) {
    return this.screeningSeatSelection.isSelected(`${seat}${AuditoriumRow[row]}`);
  }

  isSeatReserved(seat: number, row: number) {
    return this.reservationSeatSelection.isSelected(`${seat}${AuditoriumRow[row]}`);
  }

  bookTickets() {
    const selectedSeats = this.reservationSeatSelection.selected;
    selectedSeats.forEach((seat: string) => {
      const reservation = {
        user: this.user.user,
        screening: this.currentScreening,
        seat,
        movie: this.currentScreening.movie,
      };
      this.store.dispatch(addReservationRequest({ payload: { reservation } }));
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.auditoriumSubscription.unsubscribe();
    this.reservationsSubscription.unsubscribe();
    this.screeningSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
