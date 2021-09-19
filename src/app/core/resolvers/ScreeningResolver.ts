import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers';
import { Observable } from 'rxjs';
import * as BookingActions from '../store/actions/booking.actions';
import { Screening } from '../../shared/models/Screening';

@Injectable()
export class ScreeningResolver implements Resolve<Observable<Screening>> {
  constructor(private store: Store<State>, private action$: Actions) {}

  resolve(route: ActivatedRouteSnapshot) {
    const screeningId = route.params.screeningId;
    this.store.dispatch(BookingActions.getScreeningRequest({ payload: { screeningId } }));
    return this.action$.pipe(
      ofType(BookingActions.getScreeningSuccess),
      map((action) => action.payload),
      take(1)
    );
  }
}
