import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { Auditorium } from 'src/app/shared/models/Auditorium';
import { Reservation } from 'src/app/shared/models/Reservation';
import { Screening } from 'src/app/shared/models/Screening';
import * as BookingActions from '../actions/booking.actions';

export interface BookingState {
  auditorium: Auditorium;
  reservations: Reservation[];
  screening: Screening;
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
