import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom, filter, mapTo, tap } from 'rxjs/internal/operators';
import * as MoviesActions from '../actions/movies.actions';
import * as SnackBarActions from '../actions/snack-bar.actions';
import { MoviesService } from '../../services/movies.service';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import { getSignedInUserSelector } from 'src/app/core/store/reducers/auth.reducer';
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
              this.router.navigate(['/movies']);
            }
            return of(MoviesActions.getMovieDetailsFailure({ payload: error }));
          })
        )
      )
    )
  );

  createMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.createMovieRequest),
      map((action) => action.payload),
      switchMap(({ movie, uploadPhotos, coverPhoto }) =>
        this.moviesService.createMovie(movie).pipe(
          map((response) => MoviesActions.createMovieSuccess({ payload: { movie: response, uploadPhotos, coverPhoto } })),
          catchError((error) => of(MoviesActions.createMovieFailure({ payload: error })))
        )
      )
    )
  );

  redirectOnMovieCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MoviesActions.createMovieSuccess),
        map((action) => action.payload),
        tap(({ movie }) => {
          this.router.navigate([`/cinema/edit/${movie.id}`]);
        })
      ),
    { dispatch: false }
  );

  redirectOnMovieRemove$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MoviesActions.removeMovieSuccess),
        tap(() => {
          this.router.navigate([`/cinema/create`]);
        })
      ),
    { dispatch: false }
  );

  updateMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.updateMovieRequest),
      map((action) => action.payload),
      switchMap(({ movie, uploadPhotos, coverPhoto }) => {
        return this.moviesService.updateMovie(movie).pipe(
          map((response) => MoviesActions.updateMovieSuccess({ payload: { movie: response, uploadPhotos, coverPhoto } })),
          catchError((error) => of(MoviesActions.updateMovieFailure({ payload: error })))
        );
      })
    )
  );

  uploadCoverPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.updateMovieSuccess, MoviesActions.createMovieSuccess),
      map((action) => action.payload),
      filter((payload) => payload.coverPhoto),
      switchMap(({ movie, coverPhoto }) => {
        return this.moviesService.uploadPhotos(coverPhoto).pipe(
          map((response) => MoviesActions.uploadCoverPhotoSuccess({ payload: { movie, coverPhoto: response } })),
          catchError((error) => of(MoviesActions.uploadCoverPhotoFailure({ payload: error })))
        );
      })
    )
  );

  uploadGalleryPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.updateMovieSuccess, MoviesActions.createMovieSuccess),
      map((action) => action.payload),
      filter((payload) => payload.uploadPhotos.length),
      switchMap(({ movie, uploadPhotos }) => {
        return this.moviesService.uploadPhotos(uploadPhotos).pipe(
          map((response) => MoviesActions.uploadGalleryPhotosSuccess({ payload: { movie, uploadPhotos: response } })),
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

  showSnackBarOnMovieRemove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.removeMovieSuccess),
      mapTo(SnackBarActions.showSnackBar({ payload: { message: 'movie.managing.panel.remove_success.snackbar' } }))
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
      switchMap((rating) =>
        this.moviesService.updateRating(rating).pipe(
          map((response) => MoviesActions.updateRatingSuccess({ payload: response })),
          catchError((error) => of(MoviesActions.updateRatingFailure({ payload: error })))
        )
      )
    )
  );

  updateMovieRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.addRatingSuccess, MoviesActions.updateRatingSuccess),
      map((action) => action.payload),
      map(({ id, value, user, movie }) => {
        const ratings = movie.ratings ? [...movie.ratings, { id, value, user, movie }] : [{ id, value, user, movie }];
        const updatedMovie = {
          ...movie,
          ratings,
        };
        return updatedMovie;
      }),
      map((movie) => MoviesActions.updateMovieRequest({ payload: { movie } }))
    )
  );

  refreshMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.removeMovieSuccess, MoviesActions.updateMovieSuccess, MoviesActions.createMovieSuccess),
      mapTo(MoviesActions.getMoviesRequest())
    )
  );

  refreshMovieDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.updateMovieSuccess),
      map((action) => action.payload),
      map(({ movie }) => MoviesActions.getMovieDetailsRequest({ payload: { movieId: movie.id } }))
    )
  );

  showSnackBarOnMovieDataSubmitSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.updateMovieSuccess, MoviesActions.createMovieSuccess),
      mapTo(SnackBarActions.showSnackBar({ payload: { message: 'movie.managing.panel.submit_succes.snackbar' } }))
    )
  );

  constructor(private actions$: Actions, private moviesService: MoviesService, private store: Store<State>, private router: Router) {}
}
