import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { CinemaAuditorium } from '../../../shared/models/CinemaAuditorium';
import { MovieReservation } from '../../../shared/models/MovieReservation';
import { MovieScreening } from '../../../shared/models/MovieScreening';
import * as BookingActions from '../actions/booking.actions';

export interface BookingState {
  auditorium: CinemaAuditorium;
  reservations: MovieReservation[];
  screening: MovieScreening;
}

export const initialState: BookingState = {
  auditorium: null,
  reservations: [],
  screening: null,
};

const bookingReducer = createReducer(
  initialState,
  on(BookingActions.getAuditoriumSuccess, (state, { payload }) => ({ ...state, auditorium: payload })),
  on(BookingActions.getReservationsSuccess, (state, { payload }) => ({ ...state, reservations: payload })),
  on(BookingActions.getScreeningSuccess, (state, { payload }) => ({ ...state, screening: payload }))
);

export function reducer(state: BookingState | undefined, action: Action) {
  return bookingReducer(state, action);
}

export const bookingSelector = (state) => state.bookingState;

export const getAuditoriumSelector = createSelector(bookingSelector, (state: BookingState) => state.auditorium);

export const getReservationsSelector = createSelector(bookingSelector, (state: BookingState) => state.reservations);

export const getScreeeningSelector = createSelector(bookingSelector, (state: BookingState) => state.screening);
