import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/core/store/reducers';
import { getSignedInUserSelector } from 'src/app/core/store/reducers/auth.reducer';
import { User } from 'src/app/shared/models/User';
import { MovieReservation } from '../../../shared/models/MovieReservation';
import { Subscription } from 'rxjs';
import { getReservationsRequest } from 'src/app/core/store/actions/booking.actions';
import { getReservationsSelector } from 'src/app/core/store/reducers/booking.reducer';
import { fadeInAnimation } from 'src/app/shared/animations/fade-in.animation';
import { CancelReservationDialogComponent } from './cancel-reservation-dialog/cancel-reservation-dialog.component';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.scss'],
  animations: [fadeInAnimation],
})
export class UserReservationsComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<MovieReservation>;
  reservationsSubscription: Subscription;
  userSubscription: Subscription;
  displayedColumns: string[];
  userReservations: MovieReservation[];
  user: User;

  constructor(private store: Store<State>, private currentRoute: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit() {
    const { userId } = this.currentRoute.snapshot.params;
    this.displayedColumns = ['reservation', 'movie', 'auditorium', 'seat', 'day', 'hour', 'reservationCancelButton'];
    this.dataSource = new MatTableDataSource<MovieReservation>([]);
    this.store.dispatch(getReservationsRequest());

    this.reservationsSubscription = this.store.select(getReservationsSelector).subscribe((reservations: MovieReservation[]) => {
      (this.dataSource.data = reservations),
        length && reservations.filter((reservation: MovieReservation) => reservation.user.id === +userId);
    });

    this.userSubscription = this.store.select(getSignedInUserSelector).subscribe((user: User) => {
      this.user = user;
    });
  }

  cancelReservation(reservationId: number) {
    this.dialog.open(CancelReservationDialogComponent, {
      width: '400px',
      height: 'auto',
      data: reservationId,
    });
  }

  ngOnDestroy() {
    this.reservationsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
