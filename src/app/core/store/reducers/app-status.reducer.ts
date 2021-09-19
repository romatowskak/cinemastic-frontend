import { createSelector } from '@ngrx/store';
import { RequestStatus } from '../../../shared/models/RequestStatus';
import { RequestActionState } from 'src/app/shared/enums/RequestActionState';
import camelCase from 'lodash.camelcase';

export interface AppStatusState {
  pendingRequests: number;
  signIn?: RequestStatus;
}

export const initialState: AppStatusState = {
  pendingRequests: 0,
};

export function reducer(state = initialState, action) {
  const matches: RegExpExecArray = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(action.type);
  if (!!matches) {
    const [, requestName, requestState] = matches;
    return {
      ...state,
      [camelCase(requestName)]: {
        state: requestState,
        isInProgress: requestState === RequestActionState.REQUEST,
        response: requestState === RequestActionState.SUCCESS ? action.payload : null,
        errorResponse: requestState === RequestActionState.FAILURE ? action.payload : null,
      },
    };
  }

  return state;
}

export const appStatusSelector = (state) => state.appStatus;

export const getPendingRequests = createSelector(appStatusSelector, (state: AppStatusState) => state.pendingRequests);

export const getSignInStatus = createSelector(appStatusSelector, (state: AppStatusState) => state.signIn);
