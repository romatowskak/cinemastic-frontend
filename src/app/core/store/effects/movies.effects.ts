import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/internal/operators';
import * as MoviesActions from '../actions/movies.actions';
import { MoviesService } from '../../services/movies.service';

@Injectable()
export class MoviesEffects {
  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.getMoviesRequest),
      switchMap(() =>
        this.moviesService.getMovies().pipe(
          map((response) => MoviesActions.getMoviesSuccess({ payload: response })),
          catchError((error) => of(MoviesActions.getMoviesFailure({ payload: error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private moviesService: MoviesService) {}
}
