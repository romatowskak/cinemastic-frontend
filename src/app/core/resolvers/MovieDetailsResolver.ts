import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/shared/models/Movie';
import * as MoviesActions from '../store/actions/movies.actions';

@Injectable()
export class MovieDetailsResolver implements Resolve<Observable<Movie>> {
  constructor(private store: Store<State>, private action$: Actions) {}

  resolve(route: ActivatedRouteSnapshot) {
    const movieId = route.params.movieId;
    this.store.dispatch(MoviesActions.getMovieDetailsRequest({ payload: { movieId } }));
    return this.action$.pipe(
      ofType(MoviesActions.getMovieDetailsSuccess),
      map((action) => action.payload),
      take(1)
    );
  }
}
