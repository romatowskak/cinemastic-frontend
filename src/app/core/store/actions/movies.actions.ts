import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/shared/models/Movie';
import { createRequestAction } from './utils/createRequestAction';
import { MovieRating } from 'src/app/shared/models/MovieRating';

export const GET_MOVIES = createRequestAction('GET_MOVIES');
export const GET_MOVIE_DETAILS = createRequestAction('GET_MOVIE_DETAILS');
export const UPDATE_MOVIE = createRequestAction('UPDATE_MOVIE');
export const ADD_RATING = createRequestAction('ADD_RATING');
export const UPDATE_RATING = createRequestAction('UPDATE_RATING');

export const getMoviesRequest = createAction(GET_MOVIES.REQUEST);
export const getMoviesSuccess = createAction(GET_MOVIES.SUCCESS, props<{ payload: Movie[] }>());
export const getMoviesFailure = createAction(GET_MOVIES.FAILURE, props<{ payload: HttpErrorResponse }>());

export const getMovieDetailsRequest = createAction(GET_MOVIE_DETAILS.REQUEST, props<{ payload: { movieId: number } }>());
export const getMovieDetailsSuccess = createAction(GET_MOVIE_DETAILS.SUCCESS, props<{ payload: Movie }>());
export const getMovieDetailsFailure = createAction(GET_MOVIE_DETAILS.FAILURE, props<{ payload: HttpErrorResponse }>());

export const updateMovieRequest = createAction(UPDATE_MOVIE.REQUEST, props<{ payload: Movie }>());
export const updateMovieSuccess = createAction(UPDATE_MOVIE.SUCCESS, props<{ payload: Movie }>());
export const updateMovieFailure = createAction(UPDATE_MOVIE.FAILURE, props<{ payload: HttpErrorResponse }>());

export const addRatingRequest = createAction(ADD_RATING.REQUEST, props<{ payload: { value: number; movie: Movie } }>());
export const addRatingSuccess = createAction(ADD_RATING.SUCCESS, props<{ payload: MovieRating }>());
export const addRatingFailure = createAction(ADD_RATING.FAILURE, props<{ payload: HttpErrorResponse }>());

export const updateRatingRequest = createAction(UPDATE_RATING.REQUEST, props<{ payload: MovieRating }>());
export const updateRatingSuccess = createAction(UPDATE_RATING.SUCCESS, props<{ payload: MovieRating }>());
export const updateRatingFailure = createAction(UPDATE_RATING.FAILURE, props<{ payload: HttpErrorResponse }>());
