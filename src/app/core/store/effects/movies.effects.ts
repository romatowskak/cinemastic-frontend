import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom, filter } from 'rxjs/internal/operators';
import * as MoviesActions from '../actions/movies.actions';
import { MoviesService } from '../../services/movies.service';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import { getSignedInUserSelector } from 'src/app/core/store/reducers/auth.reducer';
import { getMoviesSelector } from '../reducers/movies.reducer';
import { MovieRating } from 'src/app/shared/models/MovieRating';
import { Router } from '@angular/router';

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
          catchError((error) => {
            if (error.status === 404) {
              this.router.navigate(['/cinemastic/movies']);
            }
            return of(MoviesActions.getMovieDetailsFailure({ payload: error }));
          })
        )
      )
    )
  );

  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.addMovieRequest),
      map((action) => action.payload),
      switchMap(({ movie, uploadPhotos }) =>
        this.moviesService.addMovie(movie).pipe(
          map((movie) => MoviesActions.addMovieSuccess({ payload: { movie, uploadPhotos } })),
          catchError((error) => of(MoviesActions.addMovieFailure({ payload: error })))
        )
      )
    )
  );

  updateMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.updateMovieRequest),
      map((action) => action.payload),
      switchMap(({ movie, uploadPhotos, coverPhoto }) => {
        return this.moviesService.updateMovie(movie).pipe(
          map((movie) => MoviesActions.updateMovieSuccess({ payload: { movie, uploadPhotos, coverPhoto } })),
          catchError((error) => of(MoviesActions.updateMovieFailure({ payload: error })))
        );
      })
    )
  );

  uploadCoverPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.updateMovieSuccess),
      map((action) => action.payload),
      filter((payload) => !!payload.coverPhoto),
      switchMap(({ movie, coverPhoto }) => {
        return this.moviesService.uploadPhotos(coverPhoto).pipe(
          map((coverPhoto) => MoviesActions.uploadCoverPhotoSuccess({ payload: { movie, coverPhoto } })),
          catchError((error) => of(MoviesActions.uploadCoverPhotoFailure({ payload: error })))
        );
      })
    )
  );

  uploadGalleryPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.updateMovieSuccess),
      map((action) => action.payload),
      filter((payload) => !!payload.uploadPhotos.length),
      switchMap(({ movie, uploadPhotos }) => {
        return this.moviesService.uploadPhotos(uploadPhotos).pipe(
          map((uploadPhotos) => MoviesActions.uploadGalleryPhotosSuccess({ payload: { movie, uploadPhotos } })),
          catchError((error) => of(MoviesActions.uploadGalleryPhotosFailure({ payload: error })))
        );
      })
    )
  );

  updateMovieGallery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.uploadGalleryPhotosSuccess),
      map((action) => action.payload),
      map(({ movie, uploadPhotos }) => {
        const cinemaMovie = { ...movie, gallery: [...movie.gallery, ...uploadPhotos] };
        return MoviesActions.updateMovieRequest({ payload: { movie: cinemaMovie } });
      })
    )
  );

  updateMovieCoverPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.uploadCoverPhotoSuccess),
      map((action) => action.payload),
      map(({ movie, coverPhoto }) => {
        const cinemaMovie = { ...movie, coverPhoto };
        return MoviesActions.updateMovieRequest({ payload: { movie: cinemaMovie } });
      })
    )
  );

  removeMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.removeMovieRequest),
      map((action) => action.payload),
      switchMap(({ movieId }) =>
        this.moviesService.removeMovie(movieId).pipe(
          map(() => MoviesActions.removeMovieSuccess()),
          catchError((error) => of(MoviesActions.removeMovieFailure({ payload: error })))
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
      map((movieUpdated) => MoviesActions.updateMovieRequest({ payload: { movie: movieUpdated } }))
    )
  );

  refreshSelectedMovieDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.updateMovieSuccess),
      map((action) => action.payload),
      map(({ movie }) => MoviesActions.getMovieDetailsRequest({ payload: { movieId: movie.id } }))
    )
  );

  constructor(private actions$: Actions, private moviesService: MoviesService, private store: Store<State>, private router: Router) {}
}
