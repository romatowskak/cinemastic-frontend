import { Action, createReducer, createSelector, on } from '@ngrx/store';
import * as MoviesActions from '../actions/movies.actions';
import { Movie } from 'src/app/shared/models/Movie';

export interface MoviesState {
  movies: Movie[];
}

export const initialState: MoviesState = {
  movies: [],
};

const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.getMoviesSuccess, (state, { payload }) => ({ ...state, movies: payload }))
);

export function reducer(state: MoviesState | undefined, action: Action) {
  return moviesReducer(state, action);
}

export const moviesSelector = (state) => state.moviesState;

export const getMoviesSelector = createSelector(moviesSelector, (state: MoviesState) => state.movies);
