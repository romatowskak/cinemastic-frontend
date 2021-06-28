import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers';
import { Observable } from 'rxjs';
import * as BookingActions from '../store/actions/booking.actions';
import { MovieReservation } from '../../shared/models/MovieReservation';

@Injectable()
export class ReservationsResolver implements Resolve<Observable<MovieReservation[]>> {
  constructor(private store: Store<State>, private action$: Actions) {}

  resolve() {
    this.store.dispatch(BookingActions.getReservationsRequest());
    return this.action$.pipe(
      ofType(BookingActions.getReservationsSuccess),
      map((action) => action.payload),
      take(1)
    );
  }
}
