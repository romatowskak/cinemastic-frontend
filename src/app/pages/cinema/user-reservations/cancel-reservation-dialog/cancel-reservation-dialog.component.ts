import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { removeReservationRequest } from 'src/app/core/store/actions/booking.actions';
import { State } from 'src/app/core/store/reducers';

@Component({
  selector: 'app-cancel-reservation-dialog',
  templateUrl: './cancel-reservation-dialog.component.html',
  styleUrls: ['./cancel-reservation-dialog.component.scss'],
})
export class CancelReservationDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private store: Store<State>) {}

  ngOnInit() {}

  cancelReservation() {
    this.store.dispatch(removeReservationRequest({ payload: { reservationId: this.data } }));
  }
}
