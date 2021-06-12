import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/shared/models/Movie';
import { createRequestAction } from './utils/createRequestAction';

export const GET_MOVIES = createRequestAction('GET_MOVIES');
export const GET_MOVIE_DETAILS = createRequestAction('GET_MOVIE_DETAILS');

export const getMoviesRequest = createAction(GET_MOVIES.REQUEST);
export const getMoviesSuccess = createAction(GET_MOVIES.SUCCESS, props<{ payload: Movie[] }>());
export const getMoviesFailure = createAction(GET_MOVIES.FAILURE, props<{ payload: HttpErrorResponse }>());

export const getMovieDetailsRequest = createAction(GET_MOVIE_DETAILS.REQUEST, props<{ payload: { movieId: number } }>());
export const getMovieDetailsSuccess = createAction(GET_MOVIE_DETAILS.SUCCESS, props<{ payload: Movie }>());
export const getMovieDetailsFailure = createAction(GET_MOVIE_DETAILS.FAILURE, props<{ payload: HttpErrorResponse }>());
