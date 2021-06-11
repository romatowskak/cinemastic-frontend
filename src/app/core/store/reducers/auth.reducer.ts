import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { User } from 'src/app/shared/models/User';
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
  user: User;
}

export const initialState: AuthState = {
  user: null,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.signInSuccess, (state, { payload }) => ({ ...state, user: payload })),
  on(AuthActions.signOut, (state) => ({ ...state, user: null }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}

export const authSelector = (state) => state.authState;

export const getSignedInUserSelector = createSelector(authSelector, (state: AuthState) => state.user);
