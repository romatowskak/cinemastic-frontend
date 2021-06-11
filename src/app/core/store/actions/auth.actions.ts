import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { createRequestAction } from './utils/createRequestAction';
import { User } from 'src/app/shared/models/User';
import { UserCredentials } from '../../../shared/models/UserCredentials';

export const SIGN_IN = createRequestAction('SIGN_IN');
export const GET_SIGNED_IN_USER = createRequestAction('GET_SIGNED_IN_USER');
export const SIGN_OUT = 'SIGN_OUT';

export const signInRequest = createAction(SIGN_IN.REQUEST, props<{ payload: UserCredentials }>());
export const signInSuccess = createAction(SIGN_IN.SUCCESS, props<{ payload: User }>());
export const signInFailure = createAction(SIGN_IN.FAILURE, props<{ payload: HttpErrorResponse }>());

export const getSignedInUserRequest = createAction(GET_SIGNED_IN_USER.REQUEST);
export const getSignedInUserSuccess = createAction(GET_SIGNED_IN_USER.SUCCESS, props<{ payload: User }>());
export const getSignedInUserFailure = createAction(GET_SIGNED_IN_USER.FAILURE, props<{ payload: HttpErrorResponse }>());

export const signOut = createAction(SIGN_OUT);
