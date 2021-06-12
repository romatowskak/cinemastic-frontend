import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/internal/operators';
import * as MoviesActions from '../actions/movies.actions';
import { MoviesService } from '../../services/movies.service';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import { getSignedInUserSelector } from 'src/app/core/store/reducers/auth.reducer';
import { getMoviesRequest, getMovieDetailsRequest } from 'src/app/core/store/actions/movies.actions';
import { getMoviesSelector } from '../reducers/movies.reducer';
import { Movie } from 'src/app/shared/models/Movie';
import { MovieRating } from 'src/app/shared/models/MovieRating';

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

  getMovieDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.getMovieDetailsRequest),
      map((action) => action.payload),
      switchMap(({ movieId }) =>
        this.moviesService.getMovieDetails(movieId).pipe(
          map((response) => MoviesActions.getMovieDetailsSuccess({ payload: response })),
          catchError((error) => of(MoviesActions.getMovieDetailsFailure({ payload: error })))
        )
      )
    )
  );

  updateMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.updateMovieRequest),
      map((action) => action.payload),
      switchMap((payload) =>
        this.moviesService.updateMovie(payload).pipe(
          map((response) => MoviesActions.updateMovieSuccess({ payload: response })),
          catchError((error) => of(MoviesActions.updateMovieFailure({ payload: error })))
        )
      )
    )
  );

  addRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.addRatingRequest),
      withLatestFrom(this.store.select(getSignedInUserSelector)),
      switchMap(([{ payload }, user]) =>
        this.moviesService.addRating(payload.value, payload.movie, user).pipe(
          map((response) => MoviesActions.addRatingSuccess({ payload: response })),
          catchError((error) => of(MoviesActions.addRatingFailure({ payload: error })))
        )
      )
    )
  );

  updateRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.updateRatingRequest),
      map((action) => action.payload),
      switchMap((rating: MovieRating) =>
        this.moviesService.updateRating(rating).pipe(
          map((response) => MoviesActions.updateRatingSuccess({ payload: response })),
          catchError((error) => of(MoviesActions.updateRatingFailure({ payload: error })))
        )
      )
    )
  );

  updateMovieAfterRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.addRatingSuccess, MoviesActions.updateRatingSuccess),
      withLatestFrom(this.store.select(getMoviesSelector)),
      map(([{ payload }, movies]) => {
        const movie = movies.find((movie) => movie.id === payload.movie.id);
        const movieUpdated = { ...movie, ratings: [...movie.ratings, payload] };
        return movieUpdated;
      }),
      map((movieUpdated) => MoviesActions.updateMovieRequest({ payload: movieUpdated }))
    )
  );

  refreshSelectedMovieDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.updateMovieSuccess),
      map((action) => action.payload),
      map((movie) => MoviesActions.getMovieDetailsRequest({ payload: { movieId: movie.id } }))
    )
  );

  constructor(private actions$: Actions, private moviesService: MoviesService, private store: Store<State>) {}
}
