import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/shared/models/Movie';
import { createRequestAction } from './utils/createRequestAction';
import { MovieRating } from 'src/app/shared/models/MovieRating';
import { MoviePhoto } from '../../../shared/models/MoviePhoto';
import { MovieReservation } from '../../../shared/models/MovieReservation';
import { MovieScreening } from '../../../shared/models/MovieScreening';
import { AuditoriumSeat } from 'src/app/shared/models/AuditoriumSeat';

export const GET_MOVIES = createRequestAction('GET_MOVIES');
export const GET_MOVIE_DETAILS = createRequestAction('GET_MOVIE_DETAILS');
export const ADD_MOVIE = createRequestAction('ADD_MOVIE');
export const UPDATE_MOVIE = createRequestAction('UPDATE_MOVIE');
export const REMOVE_MOVIE = createRequestAction('REMOVE_MOVIE');
export const ADD_RATING = createRequestAction('ADD_RATING');
export const UPDATE_RATING = createRequestAction('UPDATE_RATING');
export const UPLOAD_PHOTOS = createRequestAction('UPLOAD_PHOTOS');
export const ADD_SEAT = createRequestAction('ADD_SEAT');
export const GET_AUDITORIUM = createRequestAction('GET_AUDITORIUM');
export const GET_RESERVATIONS = createRequestAction('GET_RESERVATIONS');
export const ADD_RESERVATION = createRequestAction('ADD_RESERVATION');
export const GET_SCREENING = createRequestAction('GET_SCREENING');

export const getMoviesRequest = createAction(GET_MOVIES.REQUEST);
export const getMoviesSuccess = createAction(GET_MOVIES.SUCCESS, props<{ payload: Movie[] }>());
export const getMoviesFailure = createAction(GET_MOVIES.FAILURE, props<{ payload: HttpErrorResponse }>());

export const getMovieDetailsRequest = createAction(GET_MOVIE_DETAILS.REQUEST, props<{ payload: { movieId: number } }>());
export const getMovieDetailsSuccess = createAction(GET_MOVIE_DETAILS.SUCCESS, props<{ payload: Movie }>());
export const getMovieDetailsFailure = createAction(GET_MOVIE_DETAILS.FAILURE, props<{ payload: HttpErrorResponse }>());

export const addMovieRequest = createAction(ADD_MOVIE.REQUEST, props<{ payload: { movie: Movie; uploadPhotos? } }>());
export const addMovieSuccess = createAction(ADD_MOVIE.SUCCESS, props<{ payload: { movie: Movie; uploadPhotos? } }>());
export const addMovieFailure = createAction(ADD_MOVIE.FAILURE, props<{ payload: HttpErrorResponse }>());

export const updateMovieRequest = createAction(UPDATE_MOVIE.REQUEST, props<{ payload: { movie: Movie; uploadPhotos? } }>());
export const updateMovieSuccess = createAction(UPDATE_MOVIE.SUCCESS, props<{ payload: { movie: Movie; uploadPhotos? } }>());
export const updateMovieFailure = createAction(UPDATE_MOVIE.FAILURE, props<{ payload: HttpErrorResponse }>());

export const removeMovieRequest = createAction(REMOVE_MOVIE.REQUEST, props<{ payload: { movieId: number } }>());
export const removeMovieSuccess = createAction(REMOVE_MOVIE.SUCCESS);
export const removeMovieFailure = createAction(REMOVE_MOVIE.FAILURE, props<{ payload: HttpErrorResponse }>());

export const addRatingRequest = createAction(ADD_RATING.REQUEST, props<{ payload: { value: number; movie: Movie } }>());
export const addRatingSuccess = createAction(ADD_RATING.SUCCESS, props<{ payload: MovieRating }>());
export const addRatingFailure = createAction(ADD_RATING.FAILURE, props<{ payload: HttpErrorResponse }>());

export const updateRatingRequest = createAction(UPDATE_RATING.REQUEST, props<{ payload: MovieRating }>());
export const updateRatingSuccess = createAction(UPDATE_RATING.SUCCESS, props<{ payload: MovieRating }>());
export const updateRatingFailure = createAction(UPDATE_RATING.FAILURE, props<{ payload: HttpErrorResponse }>());

export const uploadPhotosRequest = createAction(UPLOAD_PHOTOS.REQUEST, props<{ payload: { movie: Movie; uploadPhotos } }>());
export const uploadPhotosSuccess = createAction(UPLOAD_PHOTOS.SUCCESS, props<{ payload: { movie: Movie; uploadPhotos } }>());
export const uploadPhotosFailure = createAction(UPLOAD_PHOTOS.FAILURE, props<{ payload: HttpErrorResponse }>());

export const addSeatRequest = createAction(ADD_SEAT.REQUEST, props<{ payload: AuditoriumSeat }>());
export const addSeatSuccess = createAction(ADD_SEAT.SUCCESS, props<{ payload: AuditoriumSeat }>());
export const addSeatFailure = createAction(ADD_SEAT.FAILURE, props<{ payload: HttpErrorResponse }>());

export const getAuditoriumRequest = createAction(GET_AUDITORIUM.REQUEST, props<{ payload: { auditoriumId: number } }>());
export const getAuditoriumSuccess = createAction(GET_AUDITORIUM.SUCCESS, props<{ payload: any }>());
export const getAuditoriumFailure = createAction(GET_AUDITORIUM.FAILURE, props<{ payload: HttpErrorResponse }>());

export const getReservationsRequest = createAction(GET_RESERVATIONS.REQUEST);
export const getReservationsSuccess = createAction(GET_RESERVATIONS.SUCCESS, props<{ payload: MovieReservation[] }>());
export const getReservationsFailure = createAction(GET_RESERVATIONS.FAILURE, props<{ payload: HttpErrorResponse }>());

export const addReservationRequest = createAction(ADD_RESERVATION.REQUEST, props<{ payload: { reservation: MovieReservation } }>());
export const addReservationSuccess = createAction(ADD_RESERVATION.SUCCESS, props<{ payload: MovieReservation }>());
export const addReservationFailure = createAction(ADD_RESERVATION.FAILURE, props<{ payload: HttpErrorResponse }>());

export const getScreeningRequest = createAction(GET_SCREENING.REQUEST, props<{ payload: { screeningId: number } }>());
export const getScreeningSuccess = createAction(GET_SCREENING.SUCCESS, props<{ payload: MovieScreening }>());
export const getScreeningFailure = createAction(GET_SCREENING.FAILURE, props<{ payload: HttpErrorResponse }>());
