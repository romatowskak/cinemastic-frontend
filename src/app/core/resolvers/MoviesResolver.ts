import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers';
import { Movie } from 'src/app/shared/models/Movie';
import * as MoviesActions from '../store/actions/movies.actions';

@Injectable()
export class MoviesResolver implements Resolve<Movie[]> {
  constructor(private store: Store<State>, private action$: Actions) {}

  resolve() {
    this.store.dispatch(MoviesActions.getMoviesRequest());
    return this.action$.pipe(
      ofType(MoviesActions.getMoviesSuccess),
      map((action) => action.payload),
      take(1)
    );
  }
}
