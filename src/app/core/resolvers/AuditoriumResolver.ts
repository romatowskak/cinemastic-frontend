import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers';
import { Observable } from 'rxjs';
import * as MoviesActions from '../store/actions/movies.actions';
import { CinemaAuditorium } from '../../shared/models/CinemaAuditorium';

@Injectable()
export class AuditoriumResolver implements Resolve<Observable<CinemaAuditorium>> {
  constructor(private store: Store<State>, private action$: Actions) {}

  resolve(route: ActivatedRouteSnapshot) {
    const auditoriumId = route.params.auditoriumId;
    this.store.dispatch(MoviesActions.getAuditoriumRequest({ payload: { auditoriumId } }));
    return this.action$.pipe(
      ofType(MoviesActions.getAuditoriumSuccess),
      map((action) => action.payload),
      take(1)
    );
  }
}
