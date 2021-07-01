import { createAction } from '@ngrx/store';

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_FINISHED = 'REQUEST_FINISHED';

export const requestStarted = createAction(REQUEST_STARTED);

export const requestFinished = createAction(REQUEST_FINISHED);
