import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/shared/models/Movie';
import { createRequestAction } from './utils/createRequestAction';
import { MovieRating } from 'src/app/shared/models/MovieRating';

export const GET_MOVIES = createRequestAction('GET_MOVIES');
export const GET_MOVIE_DETAILS = createRequestAction('GET_MOVIE_DETAILS');
export const ADD_MOVIE = createRequestAction('ADD_MOVIE');
export const UPDATE_MOVIE = createRequestAction('UPDATE_MOVIE');
export const REMOVE_MOVIE = createRequestAction('REMOVE_MOVIE');
export const ADD_RATING = createRequestAction('ADD_RATING');
export const UPDATE_RATING = createRequestAction('UPDATE_RATING');
export const UPLOAD_GALLERY_PHOTOS = createRequestAction('UPLOAD_GALLERY_PHOTOS');
export const UPLOAD_COVER_PHOTO = createRequestAction('UPLOAD_COVER_PHOTO');

export const getMoviesRequest = createAction(GET_MOVIES.REQUEST);
export const getMoviesSuccess = createAction(GET_MOVIES.SUCCESS, props<{ payload: Movie[] }>());
export const getMoviesFailure = createAction(GET_MOVIES.FAILURE, props<{ payload: HttpErrorResponse }>());

export const getMovieDetailsRequest = createAction(GET_MOVIE_DETAILS.REQUEST, props<{ payload: { movieId: number } }>());
export const getMovieDetailsSuccess = createAction(GET_MOVIE_DETAILS.SUCCESS, props<{ payload: Movie }>());
export const getMovieDetailsFailure = createAction(GET_MOVIE_DETAILS.FAILURE, props<{ payload: HttpErrorResponse }>());

export const addMovieRequest = createAction(ADD_MOVIE.REQUEST, props<{ payload: { movie: Movie; uploadPhotos? } }>());
export const addMovieSuccess = createAction(ADD_MOVIE.SUCCESS, props<{ payload: { movie: Movie; uploadPhotos? } }>());
export const addMovieFailure = createAction(ADD_MOVIE.FAILURE, props<{ payload: HttpErrorResponse }>());

export const updateMovieRequest = createAction(UPDATE_MOVIE.REQUEST, props<{ payload: { movie: Movie; uploadPhotos?; coverPhoto? } }>());
export const updateMovieSuccess = createAction(UPDATE_MOVIE.SUCCESS, props<{ payload: { movie: Movie; uploadPhotos?; coverPhoto? } }>());
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

export const uploadGalleryPhotosRequest = createAction(UPLOAD_GALLERY_PHOTOS.REQUEST, props<{ payload: { movie: Movie; uploadPhotos } }>());
export const uploadGalleryPhotosSuccess = createAction(UPLOAD_GALLERY_PHOTOS.SUCCESS, props<{ payload: { movie: Movie; uploadPhotos } }>());
export const uploadGalleryPhotosFailure = createAction(UPLOAD_GALLERY_PHOTOS.FAILURE, props<{ payload: HttpErrorResponse }>());

export const uploadCoverPhotoRequest = createAction(UPLOAD_COVER_PHOTO.REQUEST, props<{ payload: { movie: Movie; coverPhoto? } }>());
export const uploadCoverPhotoSuccess = createAction(UPLOAD_COVER_PHOTO.SUCCESS, props<{ payload: { movie: Movie; coverPhoto? } }>());
export const uploadCoverPhotoFailure = createAction(UPLOAD_COVER_PHOTO.FAILURE, props<{ payload: HttpErrorResponse }>());
