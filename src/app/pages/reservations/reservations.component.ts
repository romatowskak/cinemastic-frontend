import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/core/store/reducers';
import { getSignedInUserSelector } from 'src/app/core/store/reducers/auth.reducer';
import { User } from 'src/app/shared/models/User';
import { Subscription } from 'rxjs';
import { getReservationsSelector } from 'src/app/core/store/reducers/booking.reducer';
import { CancelReservationDialogComponent } from './cancel-reservation-dialog/cancel-reservation-dialog.component';
import { Reservation } from 'src/app/shared/models/Reservation';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Reservation>;
  reservationsSubscription: Subscription;
  userSubscription: Subscription;
  displayedColumns: string[];
  userReservations: Reservation[];
  user: User;

  constructor(private store: Store<State>, private currentRoute: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit() {
    const { userId } = this.currentRoute.snapshot.params;
    this.displayedColumns = ['reservation', 'movie', 'auditorium', 'seat', 'day', 'hour', 'reservationCancelButton'];
    this.dataSource = new MatTableDataSource<Reservation>([]);
    this.reservationsSubscription = this.store.select(getReservationsSelector).subscribe((reservations: Reservation[]) => {
      this.dataSource.data = reservations.filter((reservation: Reservation) => reservation.user.id === +userId);
    });
    this.userSubscription = this.store.select(getSignedInUserSelector).subscribe((user: User) => {
      this.user = user;
    });
  }

  cancelReservation(reservationId: number) {
    this.dialog.open(CancelReservationDialogComponent, {
      width: '400px',
      height: 'auto',
      data: { id: reservationId },
    });
  }

  ngOnDestroy() {
    this.reservationsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
