import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Reservation } from 'src/app/shared/models/Reservation';
import { Screening } from 'src/app/shared/models/Screening';
import { createRequestAction } from './utils/createRequestAction';

export const GET_AUDITORIUM = createRequestAction('GET_AUDITORIUM');
export const GET_RESERVATIONS = createRequestAction('GET_RESERVATIONS');
export const ADD_RESERVATION = createRequestAction('ADD_RESERVATION');
export const REMOVE_RESERVATION = createRequestAction('REMOVE_RESERVATION');
export const GET_SCREENING = createRequestAction('GET_SCREENING');

export const getAuditoriumRequest = createAction(GET_AUDITORIUM.REQUEST, props<{ payload: { auditoriumId: number } }>());
export const getAuditoriumSuccess = createAction(GET_AUDITORIUM.SUCCESS, props<{ payload: any }>());
export const getAuditoriumFailure = createAction(GET_AUDITORIUM.FAILURE, props<{ payload: HttpErrorResponse }>());

export const getReservationsRequest = createAction(GET_RESERVATIONS.REQUEST);
export const getReservationsSuccess = createAction(GET_RESERVATIONS.SUCCESS, props<{ payload: Reservation[] }>());
export const getReservationsFailure = createAction(GET_RESERVATIONS.FAILURE, props<{ payload: HttpErrorResponse }>());

export const addReservationRequest = createAction(ADD_RESERVATION.REQUEST, props<{ payload: { reservation: Reservation } }>());
export const addReservationSuccess = createAction(ADD_RESERVATION.SUCCESS, props<{ payload: Reservation }>());
export const addReservationFailure = createAction(ADD_RESERVATION.FAILURE, props<{ payload: HttpErrorResponse }>());

export const removeReservationRequest = createAction(REMOVE_RESERVATION.REQUEST, props<{ payload: { reservationId: number } }>());
export const removeReservationSuccess = createAction(REMOVE_RESERVATION.SUCCESS);
export const removeReservationFailure = createAction(REMOVE_RESERVATION.FAILURE, props<{ payload: HttpErrorResponse }>());

export const getScreeningRequest = createAction(GET_SCREENING.REQUEST, props<{ payload: { screeningId: number } }>());
export const getScreeningSuccess = createAction(GET_SCREENING.SUCCESS, props<{ payload: Screening }>());
export const getScreeningFailure = createAction(GET_SCREENING.FAILURE, props<{ payload: HttpErrorResponse }>());
