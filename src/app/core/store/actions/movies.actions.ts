import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/shared/models/Movie';
import { createRequestAction } from './utils/createRequestAction';

export const GET_MOVIES = createRequestAction('GET_MOVIES');

export const getMoviesRequest = createAction(GET_MOVIES.REQUEST);
export const getMoviesSuccess = createAction(GET_MOVIES.SUCCESS, props<{ payload: Movie[] }>());
export const getMoviesFailure = createAction(GET_MOVIES.FAILURE, props<{ payload: HttpErrorResponse }>());
