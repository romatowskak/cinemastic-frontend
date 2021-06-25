import { Action, createReducer, createSelector, on } from '@ngrx/store';
import * as MoviesActions from '../actions/movies.actions';
import { Movie } from 'src/app/shared/models/Movie';
import { CinemaAuditorium } from '../../../shared/models/CinemaAuditorium';
import { MovieReservation } from '../../../shared/models/MovieReservation';
import { MovieScreening } from '../../../shared/models/MovieScreening';

export interface MoviesState {
  movies: Movie[];
  movieDetails: Movie;
  auditorium: CinemaAuditorium;
  reservations: MovieReservation[];
  screening: MovieScreening;
}

export const initialState: MoviesState = {
  movies: [],
  movieDetails: null,
  auditorium: null,
  reservations: [],
  screening: null,
};

const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.getMoviesSuccess, (state, { payload }) => ({ ...state, movies: payload })),
  on(MoviesActions.getMovieDetailsSuccess, (state, { payload }) => ({ ...state, movieDetails: payload })),
  on(MoviesActions.getAuditoriumSuccess, (state, { payload }) => ({ ...state, auditorium: payload })),
  on(MoviesActions.getReservationsSuccess, (state, { payload }) => ({ ...state, reservations: payload })),
  on(MoviesActions.getScreeningSuccess, (state, { payload }) => ({ ...state, screening: payload }))
);

export function reducer(state: MoviesState | undefined, action: Action) {
  return moviesReducer(state, action);
}

export const moviesSelector = (state) => state.moviesState;

export const getMoviesSelector = createSelector(moviesSelector, (state: MoviesState) => state.movies);

export const getMovieDetailsSelector = createSelector(moviesSelector, (state: MoviesState) => state.movieDetails);

export const getAuditoriumSelector = createSelector(moviesSelector, (state: MoviesState) => state.auditorium);

export const getReservationsSelector = createSelector(moviesSelector, (state: MoviesState) => state.reservations);

export const getScreeeningSelector = createSelector(moviesSelector, (state: MoviesState) => state.screening);
